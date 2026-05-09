import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Card, StatCard, CircularProgress, ProgressBar, Badge } from "../components/ui";
import { usePrayerStats, useTaskStats, useWaterStats } from "../hooks/useStats";
import { MOTIVATIONAL_QUOTES, PRAYERS } from "../data/mockData";
import { Flame, Droplets, Dumbbell, CheckSquare, Moon, Footprints, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const prayerStats = usePrayerStats();
  const taskStats = useTaskStats();
  const waterStats = useWaterStats();

  // Pick a quote based on day of year
  const quote = useMemo(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    return MOTIVATIONAL_QUOTES[dayOfYear % MOTIVATIONAL_QUOTES.length];
  }, []);

  const overallScore = Math.round(
    (prayerStats.percentage * 0.3 + taskStats.score * 0.4 + waterStats.percentage * 0.3)
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Greeting + Quote */}
      <div className="card-glass bg-gradient-to-br from-violet-600/10 to-purple-600/5 border-violet-200/30 dark:border-violet-700/30">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">
              {getGreeting()}, Kaif 👋
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">"{quote.text}"</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">— {quote.author}</p>
          </div>
          <div className="flex flex-col items-center">
            <CircularProgress value={overallScore} size={90} color="#8b5cf6">
              <div className="text-center">
                <div className="text-lg font-bold">{overallScore}%</div>
                <div className="text-xs text-gray-400">Today</div>
              </div>
            </CircularProgress>
            <span className="text-xs text-gray-400 mt-1">Daily Score</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Moon size={18} />} label="Prayers" value={`${prayerStats.completed}/5`} color="violet" progress={prayerStats.percentage} />
        <StatCard icon={<Droplets size={18} />} label="Water" value={`${waterStats.glasses}/${waterStats.goal}`} sub="glasses" color="cyan" progress={waterStats.percentage} />
        <StatCard icon={<CheckSquare size={18} />} label="Tasks" value={`${taskStats.completed}/${taskStats.total}`} color="green" progress={taskStats.score} />
        <StatCard icon={<Flame size={18} />} label="Calories" value={`${state.caloriesConsumed}/${state.dailyCalorieGoal}`} sub="kcal" color="orange" progress={Math.round((state.caloriesConsumed / state.dailyCalorieGoal) * 100)} />
      </div>

      {/* Streaks */}
      <div className="card">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Flame size={16} className="text-orange-500" /> Streaks</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Object.entries(state.streaks).map(([key, val]) => (
            <div key={key} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="text-2xl font-bold text-orange-500">{val}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize mt-0.5">{key} days</div>
            </div>
          ))}
        </div>
      </div>

      {/* Prayer Quick Check */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2"><Moon size={16} className="text-violet-500" /> Today's Prayers</h3>
          <Link to="/prayer" className="text-xs text-violet-600 dark:text-violet-400 flex items-center gap-1 hover:underline">
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="flex gap-2 flex-wrap">
          {PRAYERS.map(prayer => (
            <button
              key={prayer}
              onClick={() => dispatch({ type: "TOGGLE_PRAYER", prayer })}
              className={`flex-1 min-w-[80px] py-2.5 rounded-xl text-sm font-medium transition-all ${
                state.prayers[prayer]
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-violet-50 dark:hover:bg-violet-900/20"
              }`}
            >
              {prayer}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <ProgressBar value={prayerStats.completed} max={5} color="violet" size="sm" />
          <p className="text-xs text-gray-400 mt-1">{prayerStats.completed} of 5 prayers completed</p>
        </div>
      </div>

      {/* Water + Workout + Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Water */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Droplets size={15} className="text-cyan-500" /> Water</h3>
            <Badge color="cyan">{waterStats.glasses}/{waterStats.goal}</Badge>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {Array.from({ length: waterStats.goal }).map((_, i) => (
              <button
                key={i}
                onClick={() => dispatch({ type: "SET_WATER", value: i < waterStats.glasses ? i : i + 1 })}
                className={`w-8 h-8 rounded-lg text-sm transition-all ${
                  i < waterStats.glasses ? "bg-cyan-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                }`}
              >
                💧
              </button>
            ))}
          </div>
        </Card>

        {/* Workout */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Dumbbell size={15} className="text-green-500" /> Workout</h3>
            <Badge color={state.workoutDone ? "green" : "gray"}>{state.workoutDone ? "Done ✓" : "Pending"}</Badge>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            {state.workoutDone ? `${state.caloriesBurned} kcal burned today 🔥` : "No workout logged yet"}
          </p>
          <Link to="/fitness" className="btn-primary text-xs w-full text-center block">
            {state.workoutDone ? "View Fitness" : "Start Workout"}
          </Link>
        </Card>

        {/* Steps */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm flex items-center gap-2"><Footprints size={15} className="text-blue-500" /> Steps</h3>
            <Badge color="blue">{state.steps.toLocaleString()}</Badge>
          </div>
          <ProgressBar value={state.steps} max={5000} color="blue" size="md" />
          <p className="text-xs text-gray-400 mt-2">Goal: 5,000 steps</p>
          <input
            type="number"
            placeholder="Log steps..."
            className="input mt-2 text-xs py-1.5"
            onBlur={e => { if (e.target.value) { dispatch({ type: "SET_STEPS", value: parseInt(e.target.value) }); e.target.value = ""; } }}
          />
        </Card>
      </div>

      {/* Today's Tasks Preview */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2"><CheckSquare size={16} className="text-green-500" /> Today's Tasks</h3>
          <Link to="/tasks" className="text-xs text-violet-600 dark:text-violet-400 flex items-center gap-1 hover:underline">
            Manage <ArrowRight size={12} />
          </Link>
        </div>
        {taskStats.todayTasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No tasks for today</p>
        ) : (
          <div className="space-y-2">
            {taskStats.todayTasks.slice(0, 4).map(task => (
              <div key={task.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800">
                <button
                  onClick={() => dispatch({ type: "TOGGLE_TASK", id: task.id })}
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${
                    task.completed ? "bg-green-500 border-green-500" : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {task.completed && <span className="text-white text-xs flex items-center justify-center w-full h-full">✓</span>}
                </button>
                <span className={`text-sm flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}>{task.title}</span>
                <Badge color={task.priority === "high" ? "red" : task.priority === "medium" ? "yellow" : "gray"}>
                  {task.priority}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
