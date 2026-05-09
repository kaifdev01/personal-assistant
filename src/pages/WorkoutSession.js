import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { CircularProgress, Badge } from "../components/ui";
import { useTimer } from "../hooks/useStats";
import { EXERCISE_LIBRARY } from "../data/exerciseLibrary";
import { Play, Pause, SkipForward, X, CheckCircle, RotateCcw, Flame, Target, Lightbulb, AlertCircle } from "lucide-react";

export default function WorkoutSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useApp();
  const workout = location.state?.workout;

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState("ready"); // ready, exercise, rest, complete
  const [sessionStartTime] = useState(Date.now());
  const [completedExercises, setCompletedExercises] = useState([]);

  const exerciseTimer = useTimer(0, false);
  const restTimer = useTimer(30, true);

  useEffect(() => {
    if (!workout || !workout.exercises || workout.exercises.length === 0) {
      navigate("/fitness");
    }
  }, [workout, navigate]);

  useEffect(() => {
    if (phase === "rest" && restTimer.seconds === 0 && restTimer.running) {
      handleNextSet();
    }
  }, [restTimer.seconds, restTimer.running, phase]);

  if (!workout || !workout.exercises || workout.exercises.length === 0) return null;

  const currentExercise = workout.exercises[currentExerciseIndex];
  const exerciseData = EXERCISE_LIBRARY[currentExercise.name] || {};
  const totalExercises = workout.exercises.length;
  const progress = ((currentExerciseIndex + (currentSet / parseInt(currentExercise.sets))) / totalExercises) * 100;

  // Auto-complete set when time-based exercise duration is reached
  useEffect(() => {
    if (phase === "exercise" && exerciseTimer.running) {
      const reps = currentExercise.reps;
      // Check if reps is time-based (e.g., "30 sec", "45 sec")
      const timeMatch = reps.match(/(\d+)\s*sec/);
      if (timeMatch) {
        const targetSeconds = parseInt(timeMatch[1]);
        if (exerciseTimer.seconds >= targetSeconds) {
          completeSet();
        }
      }
    }
  }, [exerciseTimer.seconds, phase, exerciseTimer.running]);

  function startExercise() {
    setPhase("exercise");
    exerciseTimer.reset(0);
    exerciseTimer.start();
  }

  function completeSet() {
    exerciseTimer.pause();
    setCompletedExercises([...completedExercises, { exercise: currentExercise.name, set: currentSet }]);
    
    if (currentSet < parseInt(currentExercise.sets)) {
      // More sets remaining - go to rest
      setPhase("rest");
      const restSeconds = currentExercise.rest ? parseInt(currentExercise.rest.replace(/\D/g, "")) || 30 : 30;
      restTimer.reset(restSeconds);
      restTimer.start();
    } else {
      // Exercise complete - move to next
      if (currentExerciseIndex < totalExercises - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setPhase("ready");
        exerciseTimer.reset(0);
      } else {
        // Workout complete
        finishWorkout();
      }
    }
  }

  function handleNextSet() {
    restTimer.pause();
    setCurrentSet(currentSet + 1);
    setPhase("ready");
  }

  function skipExercise() {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setPhase("ready");
      exerciseTimer.reset(0);
      restTimer.pause();
    } else {
      finishWorkout();
    }
  }

  function finishWorkout() {
    const duration = Math.round((Date.now() - sessionStartTime) / 60000);
    const caloriesBurned = workout.calories;
    dispatch({ type: "SET_WORKOUT_DONE", value: true, calories: caloriesBurned });
    setPhase("complete");
    exerciseTimer.pause();
    restTimer.pause();
  }

  function quitWorkout() {
    if (window.confirm("Quit workout? Progress will not be saved.")) {
      navigate("/fitness");
    }
  }

  // Complete screen
  if (phase === "complete") {
    const duration = Math.round((Date.now() - sessionStartTime) / 60000);
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center p-4 z-50">
        <div className="max-w-md w-full text-center text-white animate-fade-in">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-2">Workout Complete!</h1>
          <p className="text-green-200 mb-6">Amazing work! You crushed it.</p>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{duration}</div>
              <div className="text-xs text-green-200">minutes</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{workout.calories}</div>
              <div className="text-xs text-green-200">kcal burned</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{completedExercises.length}</div>
              <div className="text-xs text-green-200">sets done</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2 text-sm">Exercises Completed:</h3>
            <div className="space-y-1">
              {workout.exercises.map((ex, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-green-100">
                  <CheckCircle size={14} />
                  <span>{ex.name} - {ex.sets} sets</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => navigate("/fitness")} className="w-full bg-white text-green-600 font-semibold py-3 rounded-xl hover:bg-green-50 transition-colors">
            Back to Fitness
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-50 dark:bg-gray-950 z-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex-1">
          <h2 className="font-bold text-sm">{workout.name}</h2>
          <p className="text-xs text-gray-400">Exercise {currentExerciseIndex + 1}/{totalExercises} · Set {currentSet}/{currentExercise.sets}</p>
        </div>
        <button onClick={quitWorkout} className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 dark:bg-gray-800">
        <div className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="max-w-2xl mx-auto p-4 pb-24">
        {/* Exercise name & badges */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-3">{currentExercise.name}</h1>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge color="violet">{currentExercise.sets} sets</Badge>
            <Badge color="blue">{currentExercise.reps}</Badge>
            {currentExercise.rest && <Badge color="orange">Rest: {currentExercise.rest}</Badge>}
            {exerciseData.difficulty && <Badge color={exerciseData.difficulty === "Beginner" ? "green" : exerciseData.difficulty === "Intermediate" ? "yellow" : "red"}>{exerciseData.difficulty}</Badge>}
          </div>
        </div>

        {/* Timer / Rest display */}
        <div className="flex justify-center mb-8">
          {phase === "rest" ? (
            <div className="text-center">
              <CircularProgress value={restTimer.seconds} max={30} size={160} color="#f97316">
                <div>
                  <div className="text-4xl font-mono font-bold">{restTimer.format}</div>
                  <div className="text-xs text-gray-400 mt-1">rest time</div>
                </div>
              </CircularProgress>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Take a breather. Next set coming up...</p>
            </div>
          ) : (
            <div className="text-center">
              {(() => {
                const reps = currentExercise.reps;
                const timeMatch = reps.match(/(\d+)\s*sec/);
                const isTimeBased = !!timeMatch;
                const targetSeconds = isTimeBased ? parseInt(timeMatch[1]) : 0;
                const remainingSeconds = isTimeBased ? Math.max(0, targetSeconds - exerciseTimer.seconds) : 0;
                
                return (
                  <>
                    {isTimeBased && phase === "exercise" ? (
                      <CircularProgress value={remainingSeconds} max={targetSeconds} size={160} color="#8b5cf6">
                        <div>
                          <div className="text-4xl font-mono font-bold">
                            {String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:{String(remainingSeconds % 60).padStart(2, "0")}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">remaining</div>
                        </div>
                      </CircularProgress>
                    ) : (
                      <CircularProgress value={phase === "exercise" ? 100 : 0} size={160} color="#8b5cf6">
                        <div>
                          <div className="text-4xl font-mono font-bold">{exerciseTimer.format}</div>
                          <div className="text-xs text-gray-400 mt-1">{phase === "ready" ? "ready" : "working"}</div>
                        </div>
                      </CircularProgress>
                    )}
                    <div className="mt-4">
                      <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">Set {currentSet}/{currentExercise.sets}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{currentExercise.reps} reps</div>
                      {isTimeBased && phase === "exercise" && remainingSeconds <= 5 && remainingSeconds > 0 && (
                        <div className="text-orange-500 font-bold text-lg mt-2 animate-pulse">Almost done! {remainingSeconds}s</div>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Exercise details */}
        {exerciseData.instructions && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 mb-4 border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-violet-600 dark:text-violet-400">
              <Target size={16} /> How to Perform
            </h3>
            <ol className="space-y-2">
              {exerciseData.instructions.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  <span className="text-gray-700 dark:text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {exerciseData.targets && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 mb-4 border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-green-600 dark:text-green-400">
              <Flame size={16} /> Target Muscles
            </h3>
            <div className="flex flex-wrap gap-2">
              {exerciseData.targets.map((muscle, i) => (
                <span key={i} className="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium">
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}

        {exerciseData.benefits && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 mb-4 border border-gray-100 dark:border-gray-800">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Lightbulb size={16} /> Benefits
            </h3>
            <ul className="space-y-2">
              {exerciseData.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exerciseData.tips && (
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-5 border border-orange-200 dark:border-orange-800">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-orange-600 dark:text-orange-400">
              <AlertCircle size={16} /> Form Tips
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{exerciseData.tips}</p>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-2xl mx-auto">
          {phase === "ready" && (
            <div className="flex gap-3">
              <button onClick={skipExercise} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                <SkipForward size={16} /> Skip
              </button>
              <button onClick={startExercise} className="btn-primary flex-[2] flex items-center justify-center gap-2 text-lg py-4">
                <Play size={20} /> Start Set {currentSet}
              </button>
            </div>
          )}

          {phase === "exercise" && (
            <div className="flex gap-3">
              <button onClick={() => { exerciseTimer.running ? exerciseTimer.pause() : exerciseTimer.start(); }} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                {exerciseTimer.running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Resume</>}
              </button>
              <button onClick={completeSet} className="btn-primary flex-[2] flex items-center justify-center gap-2 text-lg py-4">
                <CheckCircle size={20} /> Complete Set
              </button>
            </div>
          )}

          {phase === "rest" && (
            <div className="flex gap-3">
              <button onClick={() => { restTimer.running ? restTimer.pause() : restTimer.start(); }} className="btn-secondary flex-1 flex items-center justify-center gap-2">
                {restTimer.running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Resume</>}
              </button>
              <button onClick={handleNextSet} className="btn-primary flex-[2] flex items-center justify-center gap-2 text-lg py-4">
                <SkipForward size={20} /> Skip Rest
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
