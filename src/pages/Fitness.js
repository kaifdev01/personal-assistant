import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Card, Badge, ProgressBar, CircularProgress, Modal, EmptyState } from "../components/ui";
import { useTimer } from "../hooks/useStats";
import { HOME_WORKOUTS } from "../data/mockData";
import { Dumbbell, Timer, Droplets, Scale, Flame, Play, Pause, RotateCcw, ChevronDown, ChevronUp, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function Fitness() {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState("workouts");
  const [expandedWorkout, setExpandedWorkout] = useState(null);
  const [weightInput, setWeightInput] = useState("");
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [restSeconds, setRestSeconds] = useState(60);

  const workoutTimer = useTimer(0, false);
  const restTimer = useTimer(restSeconds, true);

  const TABS = ["program", "workouts", "timer", "weight", "water"];

  // Program tab state
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);

  // Map workouts to months and days
  const MONTH_PHASES = { 1: 1, 2: 2, 3: 3 };
  const phaseWorkouts = HOME_WORKOUTS.filter(w => w.phase === MONTH_PHASES[selectedMonth]);

  // Build day schedule: 5 workout days + 1 rest day per week, repeat across 30 days
  function getDayWorkout(day) {
    const dayOfWeek = ((day - 1) % 7) + 1; // 1-7
    if (dayOfWeek === 7) return null; // rest day
    const workoutIndex = (Math.floor((day - 1) / 7) * 6 + (dayOfWeek - 1)) % Math.max(phaseWorkouts.length, 1);
    return phaseWorkouts[workoutIndex] || null;
  }

  const selectedDayWorkout = getDayWorkout(selectedDay);
  const isRestDay = ((selectedDay - 1) % 7) + 1 === 7;

  function startWorkout(workout) {
    navigate("/workout-session", { state: { workout } });
  }

  function logWeight() {
    const w = parseFloat(weightInput);
    if (!w || w < 30 || w > 300) return;
    dispatch({ type: "LOG_WEIGHT", weight: w });
    setWeightInput("");
    setShowWeightModal(false);
  }

  const difficultyColor = { Beginner: "green", Intermediate: "yellow", Advanced: "red" };
  const typeColor = { HIIT: "orange", Core: "violet", Strength: "blue", Flexibility: "cyan" };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="card bg-gradient-to-br from-green-600 to-emerald-700 text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Fitness Tracker</h2>
            <p className="text-green-200 text-sm mt-1">Home workouts · Fat loss · No gym needed</p>
            <div className="flex gap-3 mt-3">
              <div className="text-center">
                <div className="font-bold">{state.caloriesBurned}</div>
                <div className="text-xs text-green-200">kcal today</div>
              </div>
              <div className="w-px bg-green-500" />
              <div className="text-center">
                <div className="font-bold">{state.currentWeight} kg</div>
                <div className="text-xs text-green-200">current weight</div>
              </div>
              <div className="w-px bg-green-500" />
              <div className="text-center">
                <div className="font-bold">{state.steps.toLocaleString()}</div>
                <div className="text-xs text-green-200">steps</div>
              </div>
            </div>
          </div>
          <CircularProgress value={state.workoutDone ? 100 : 0} size={80} color="#86efac">
            <Dumbbell size={24} className="text-white" />
          </CircularProgress>
        </div>
      </div>

      {/* Heat Warning */}
      <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
        <span className="text-xl">🌡️</span>
        <div>
          <p className="text-sm font-medium text-orange-700 dark:text-orange-400">Heat Advisory (35–45°C)</p>
          <p className="text-xs text-orange-600 dark:text-orange-500 mt-0.5">
            Workout before 7 AM or after 9 PM. Stay indoors. Drink water every 15 minutes during exercise.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg capitalize transition-all ${
              activeTab === tab ? "bg-white dark:bg-gray-900 shadow-sm text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {tab === "program" ? "📅 Plan" : tab}
          </button>
        ))}
      </div>

      {/* Program Tab */}
      {activeTab === "program" && (
        <div className="space-y-4">
          {/* Month Selector */}
          <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {[{m:1,label:"Month 1",sub:"Beginner"},{m:2,label:"Month 2",sub:"Intermediate"},{m:3,label:"Month 3",sub:"Advanced"}].map(({m,label,sub}) => (
              <button
                key={m}
                onClick={() => { setSelectedMonth(m); setSelectedDay(1); }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedMonth === m
                    ? "bg-white dark:bg-gray-900 shadow-sm text-violet-600 dark:text-violet-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <div>{label}</div>
                <div className="text-[10px] opacity-70">{sub}</div>
              </button>
            ))}
          </div>

          {/* Day Grid - Calendar Style */}
          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">
              <Calendar size={15} className="text-violet-500" /> Month {selectedMonth}
            </h3>
            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 mb-1">
              {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                <div key={d} className={`text-center text-[10px] font-semibold py-1 ${
                  d === "Sun" ? "text-orange-400" : "text-gray-400"
                }`}>{d}</div>
              ))}
            </div>
            {/* Days grid: 30 days, 7 cols = 5 rows (last row has 2 empty) */}
            <div className="grid grid-cols-7 gap-y-1">
              {Array.from({ length: 35 }, (_, i) => {
                const day = i + 1;
                if (day > 30) return <div key={i} />;
                const isRest = ((day - 1) % 7) + 1 === 7;
                const isSelected = selectedDay === day;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`mx-auto w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-violet-500 text-white shadow-sm"
                        : isRest
                        ? "text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-violet-900/20"
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block" /> Selected</span>
              <span className="flex items-center gap-1.5"><span className="text-orange-400 font-semibold">7</span> Rest (Sun)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 inline-block" /> Workout</span>
            </div>
          </Card>

          {/* Day Detail */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedDay(d => Math.max(1, d - 1))}
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-violet-500 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="text-center">
                <h3 className="font-bold">Month {selectedMonth} · Day {selectedDay}</h3>
                <p className="text-xs text-gray-400">
                  Week {Math.ceil(selectedDay / 7)} · {((selectedDay - 1) % 7) + 1 === 7 ? "Rest Day" : "Workout Day"}
                </p>
              </div>
              <button
                onClick={() => setSelectedDay(d => Math.min(30, d + 1))}
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-violet-500 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {isRestDay ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-3">😴</div>
                <h4 className="font-bold text-lg">Rest & Recovery Day</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs mx-auto">
                  Your muscles grow during rest. Sleep 7–8 hours, stay hydrated, and do light stretching.
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                  {["💧 Hydrate well", "🧘 Light stretch", "😴 Sleep 8h"].map(tip => (
                    <div key={tip} className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400 font-medium">{tip}</div>
                  ))}
                </div>
              </div>
            ) : selectedDayWorkout ? (
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <h4 className="font-semibold">{selectedDayWorkout.name}</h4>
                  <Badge color={selectedDayWorkout.type === "HIIT" ? "orange" : selectedDayWorkout.type === "Core" ? "violet" : selectedDayWorkout.type === "Strength" ? "blue" : "cyan"}>{selectedDayWorkout.type}</Badge>
                  <Badge color={selectedDayWorkout.difficulty === "Beginner" ? "green" : selectedDayWorkout.difficulty === "Intermediate" ? "yellow" : "red"}>{selectedDayWorkout.difficulty}</Badge>
                </div>
                <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><Timer size={13} />{selectedDayWorkout.duration} min</span>
                  <span className="flex items-center gap-1"><Flame size={13} />~{selectedDayWorkout.calories} kcal</span>
                  <span className="flex items-center gap-1"><Dumbbell size={13} />{selectedDayWorkout.exercises.length} exercises</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="grid grid-cols-4 text-xs font-medium text-gray-400 px-2">
                    <span>Exercise</span><span className="text-center">Sets</span><span className="text-center">Reps</span><span className="text-center">Rest</span>
                  </div>
                  {selectedDayWorkout.exercises.map((ex, i) => (
                    <div key={i} className="grid grid-cols-4 text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-medium text-xs">{ex.name}</span>
                      <span className="text-center text-gray-500 text-xs">{ex.sets}</span>
                      <span className="text-center text-gray-500 text-xs">{ex.reps}</span>
                      <span className="text-center text-gray-500 text-xs">{ex.rest}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => startWorkout(selectedDayWorkout)} className="btn-primary w-full flex items-center justify-center gap-2">
                  <Play size={15} /> Start Day {selectedDay} Workout
                </button>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400">
                <Dumbbell size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No workout assigned for this day</p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Workouts Tab */}
      {activeTab === "workouts" && (
        <div className="space-y-4">
          {HOME_WORKOUTS.map(workout => (
            <Card key={workout.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-semibold">{workout.name}</h3>
                    <Badge color={typeColor[workout.type]}>{workout.type}</Badge>
                    <Badge color={difficultyColor[workout.difficulty]}>{workout.difficulty}</Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><Timer size={13} />{workout.duration} min</span>
                    <span className="flex items-center gap-1"><Flame size={13} />~{workout.calories} kcal</span>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedWorkout(expandedWorkout === workout.id ? null : workout.id)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 ml-2"
                >
                  {expandedWorkout === workout.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              {expandedWorkout === workout.id && (
                <div className="mt-4 space-y-2 animate-fade-in">
                  <div className="grid grid-cols-4 text-xs font-medium text-gray-400 px-2">
                    <span>Exercise</span><span className="text-center">Sets</span><span className="text-center">Reps</span><span className="text-center">Rest</span>
                  </div>
                  {workout.exercises.map((ex, i) => (
                    <div key={i} className="grid grid-cols-4 text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-medium">{ex.name}</span>
                      <span className="text-center text-gray-500">{ex.sets}</span>
                      <span className="text-center text-gray-500">{ex.reps}</span>
                      <span className="text-center text-gray-500">{ex.rest}</span>
                    </div>
                  ))}
                  <button onClick={() => startWorkout(workout)} className="btn-primary w-full mt-3 flex items-center justify-center gap-2">
                    <Play size={15} /> Start Workout
                  </button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Timer Tab */}
      {activeTab === "timer" && (
        <div className="space-y-4">
          {/* Workout Timer */}
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Timer size={16} className="text-green-500" /> Workout Timer</h3>
            {state.activeWorkout && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Active: {state.activeWorkout.name}</p>
            )}
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl font-mono font-bold text-green-600 dark:text-green-400">{workoutTimer.format}</div>
              <div className="flex gap-3">
                <button onClick={workoutTimer.running ? workoutTimer.pause : workoutTimer.start} className="btn-primary flex items-center gap-2">
                  {workoutTimer.running ? <><Pause size={15} /> Pause</> : <><Play size={15} /> Start</>}
                </button>
                <button onClick={() => workoutTimer.reset(0)} className="btn-secondary flex items-center gap-2">
                  <RotateCcw size={15} /> Reset
                </button>
              </div>
            </div>
          </Card>

          {/* Rest Timer */}
          <Card>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Timer size={16} className="text-orange-500" /> Rest Timer</h3>
            <div className="flex flex-col items-center gap-4">
              <CircularProgress value={restTimer.seconds} max={restSeconds} size={120} color="#f97316">
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold">{restTimer.format}</div>
                  <div className="text-xs text-gray-400">rest</div>
                </div>
              </CircularProgress>
              <div className="flex gap-2">
                {[30, 60, 90, 120].map(s => (
                  <button key={s} onClick={() => { setRestSeconds(s); restTimer.reset(s); }} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${restSeconds === s ? "bg-orange-500 text-white" : "btn-secondary"}`}>
                    {s}s
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={restTimer.running ? restTimer.pause : restTimer.start} className="btn-primary flex items-center gap-2">
                  {restTimer.running ? <><Pause size={15} /> Pause</> : <><Play size={15} /> Start</>}
                </button>
                <button onClick={() => restTimer.reset(restSeconds)} className="btn-secondary flex items-center gap-2">
                  <RotateCcw size={15} /> Reset
                </button>
              </div>
            </div>
          </Card>

          {/* Calorie Estimator */}
          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Flame size={16} className="text-red-500" /> Calorie Estimator</h3>
            <p className="text-xs text-gray-400 mb-3">Based on 20-min HIIT for 75kg person</p>
            <div className="grid grid-cols-3 gap-3">
              {[{ label: "HIIT 20min", cal: 200 }, { label: "Strength 30min", cal: 180 }, { label: "Walk 30min", cal: 120 }].map(item => (
                <button
                  key={item.label}
                  onClick={() => dispatch({ type: "SET_CALORIES", value: state.caloriesBurned + item.cal })}
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-center hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <div className="font-bold text-red-500">+{item.cal}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.label}</div>
                </button>
              ))}
            </div>
            <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl text-center">
              <div className="text-2xl font-bold text-orange-600">{state.caloriesBurned} kcal</div>
              <div className="text-xs text-gray-400">Total burned today</div>
            </div>
          </Card>
        </div>
      )}

      {/* Weight Tab */}
      {activeTab === "weight" && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2"><Scale size={16} className="text-blue-500" /> Weight Log</h3>
              <button onClick={() => setShowWeightModal(true)} className="btn-primary text-xs">+ Log Weight</button>
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl font-bold">{state.currentWeight} <span className="text-lg text-gray-400">kg</span></div>
              <div className="text-sm text-gray-400 mt-1">Current weight</div>
              {state.weightLog.length >= 2 && (
                <div className={`text-sm mt-1 font-medium ${
                  state.weightLog[state.weightLog.length - 1].weight < state.weightLog[0].weight ? "text-green-500" : "text-red-500"
                }`}>
                  {(state.weightLog[0].weight - state.weightLog[state.weightLog.length - 1].weight).toFixed(1)} kg lost since start 🎉
                </div>
              )}
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {[...state.weightLog].reverse().map((entry, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-sm text-gray-500">{entry.date}</span>
                  <span className="font-semibold">{entry.weight} kg</span>
                </div>
              ))}
            </div>
          </Card>

          <Modal open={showWeightModal} onClose={() => setShowWeightModal(false)} title="Log Weight">
            <input
              type="number"
              placeholder="Enter weight in kg"
              className="input mb-4"
              value={weightInput}
              onChange={e => setWeightInput(e.target.value)}
            />
            <button onClick={logWeight} className="btn-primary w-full">Save</button>
          </Modal>
        </div>
      )}

      {/* Water Tab */}
      {activeTab === "water" && (
        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Droplets size={16} className="text-cyan-500" /> Hydration Tracker</h3>
          <div className="text-center mb-6">
            <CircularProgress value={state.waterGlasses} max={state.waterGoal} size={120} color="#06b6d4">
              <div>
                <div className="text-2xl font-bold">{state.waterGlasses}</div>
                <div className="text-xs text-gray-400">/ {state.waterGoal}</div>
              </div>
            </CircularProgress>
            <p className="text-sm text-gray-500 mt-2">glasses of water today</p>
            <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">In 40°C heat, aim for 12–16 glasses!</p>
          </div>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {Array.from({ length: state.waterGoal }).map((_, i) => (
              <button
                key={i}
                onClick={() => dispatch({ type: "SET_WATER", value: i < state.waterGlasses ? i : i + 1 })}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all ${
                  i < state.waterGlasses ? "bg-cyan-500 shadow-md scale-105" : "bg-gray-100 dark:bg-gray-800 opacity-50"
                }`}
              >
                💧
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => dispatch({ type: "SET_WATER", value: Math.max(0, state.waterGlasses - 1) })} className="btn-secondary flex-1">− Remove</button>
            <button onClick={() => dispatch({ type: "SET_WATER", value: state.waterGlasses + 1 })} className="btn-primary flex-1">+ Add Glass</button>
          </div>
          <ProgressBar value={state.waterGlasses} max={state.waterGoal} color="cyan" size="md" className="mt-4" showLabel />
        </Card>
      )}
    </div>
  );
}
