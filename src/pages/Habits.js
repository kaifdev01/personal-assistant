import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Card, ProgressBar, CircularProgress, Badge } from "../components/ui";
import { useHabitToday } from "../hooks/useStats";
import { HABITS, WEEKLY_STATS } from "../data/mockData";
import { Activity, TrendingUp, Calendar, Award, Target, Zap, ChevronRight } from "lucide-react";

export default function Habits() {
  const { state, dispatch } = useApp();
  const todayLog = useHabitToday();
  const [expandedHabit, setExpandedHabit] = useState(null);

  function logHabit(habitId, value) {
    dispatch({ type: "LOG_HABIT", habitId, value });
  }

  const completedHabits = HABITS.filter(h => {
    const val = todayLog[h.id];
    return val !== undefined && val >= h.target;
  }).length;

  const overallPct = Math.round((completedHabits / HABITS.length) * 100);

  // Calculate streaks dynamically from habitLog
  const habitStreaks = HABITS.reduce((acc, habit) => {
    // Count consecutive days from habitLog
    let streak = 0;
    const logs = state.habitLog;
    const dates = Object.keys(logs).sort().reverse();
    
    for (const date of dates) {
      const value = logs[date]?.[habit.id];
      if (value !== undefined && value >= habit.target) {
        streak++;
      } else {
        break;
      }
    }
    
    acc[habit.id] = streak;
    return acc;
  }, {});

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Progress Card */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-teal-600 to-cyan-700 text-white border-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">Habit Tracker</h2>
              <p className="text-teal-200 text-sm mb-3">Build discipline one day at a time</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-teal-200" />
                  <span className="font-semibold">{completedHabits}/{HABITS.length} completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-yellow-300" />
                  <span className="font-semibold">{Object.values(habitStreaks).reduce((a, b) => a + b, 0)} total streak days</span>
                </div>
              </div>
            </div>
            <CircularProgress value={completedHabits} max={HABITS.length} size={100} color="#99f6e4">
              <div className="text-center">
                <div className="text-2xl font-bold">{overallPct}%</div>
                <div className="text-xs text-teal-200">today</div>
              </div>
            </CircularProgress>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-3">
          <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200 dark:border-violet-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-500 rounded-xl flex items-center justify-center">
                <Target size={18} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{completedHabits}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Completed Today</div>
              </div>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <Zap size={18} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{Math.max(...Object.values(habitStreaks))}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Longest Streak</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Zap size={16} className="text-violet-500" /> Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {HABITS.slice(0, 3).map(habit => {
            const current = todayLog[habit.id] ?? 0;
            const done = current >= habit.target;
            return (
              <button
                key={habit.id}
                onClick={() => {
                  if (habit.target === 1) {
                    logHabit(habit.id, done ? 0 : 1);
                  } else {
                    setExpandedHabit(habit.id);
                  }
                }}
                className={`p-3 rounded-xl text-left transition-all ${
                  done 
                    ? "bg-teal-50 dark:bg-teal-900/20 border-2 border-teal-500" 
                    : "bg-gray-50 dark:bg-gray-800 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{habit.icon}</span>
                  <span className="text-xs font-medium truncate">{habit.name.split(" ")[0]}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {done ? "✓ Done" : `${current}/${habit.target}`}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Habit Cards - Compact Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Today's Habits</h3>
          <span className="text-xs text-gray-400">{completedHabits}/{HABITS.length} completed</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {HABITS.map(habit => {
            const current = todayLog[habit.id] ?? 0;
            const pct = Math.min(Math.round((current / habit.target) * 100), 100);
            const done = current >= habit.target;
            const streak = habitStreaks[habit.id] || 0;
            const isExpanded = expandedHabit === habit.id;

            return (
              <div
                key={habit.id}
                className={`rounded-2xl p-4 border-2 transition-all cursor-pointer ${
                  done
                    ? "bg-teal-50 dark:bg-teal-900/20 border-teal-400 dark:border-teal-600"
                    : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
                }`}
                onClick={() => setExpandedHabit(isExpanded ? null : habit.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{habit.icon}</span>
                  {done
                    ? <span className="text-xs font-bold text-teal-600 dark:text-teal-400">✓ Done</span>
                    : <span className="text-xs text-gray-400">{current}/{habit.target}</span>
                  }
                </div>
                <div className="font-semibold text-sm mb-1 leading-tight">{habit.name}</div>
                {streak > 0 && <div className="text-xs text-orange-500 mb-2">🔥 {streak}d streak</div>}
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${done ? "bg-teal-500" : "bg-cyan-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Expanded input */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800" onClick={e => e.stopPropagation()}>
                    <HabitInput habit={habit} current={current} onLog={logHabit} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Habit Consistency - Enhanced */}
      <Card>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Activity size={16} className="text-teal-500" /> Weekly Consistency
        </h3>
        <div className="space-y-4">
          {[
            { label: "Prayers", key: "prayers", max: 5, color: "violet", icon: "🕌" },
            { label: "Water Intake", key: "water", max: 8, color: "cyan", icon: "💧" },
            { label: "Workout", key: "workout", max: 1, color: "green", icon: "💪" },
          ].map(item => {
            const avg = WEEKLY_STATS.reduce((s, d) => s + d[item.key], 0) / WEEKLY_STATS.length;
            const pct = Math.round((avg / item.max) * 100);
            return (
              <div key={item.key}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{avg.toFixed(1)}/{item.max}</span>
                    <Badge color={pct >= 80 ? "green" : pct >= 50 ? "yellow" : "red"}>{pct}%</Badge>
                  </div>
                </div>
                <ProgressBar value={pct} max={100} color={item.color} size="md" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* 7-Day Calendar View */}
      <Card>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Calendar size={16} className="text-blue-500" /> 7-Day Habit Calendar
        </h3>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 gap-2 min-w-[500px]">
            {WEEKLY_STATS.map((day, i) => {
              const dayScore = Math.round(((day.prayers / 5 + day.water / 8 + day.workout) / 3) * 100);
              return (
                <div key={i} className="text-center">
                  <div className="text-xs text-gray-400 mb-2">{day.day}</div>
                  <div className={`aspect-square rounded-xl flex items-center justify-center font-bold text-sm ${
                    dayScore >= 80 ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                    dayScore >= 50 ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                    dayScore >= 20 ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400" :
                    "bg-gray-100 dark:bg-gray-800 text-gray-400"
                  }`}>
                    {dayScore}%
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {dayScore >= 80 ? "🔥" : dayScore >= 50 ? "👍" : dayScore >= 20 ? "😐" : "😴"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-500 rounded"></span> 80%+</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-500 rounded"></span> 50-79%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-orange-500 rounded"></span> 20-49%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded"></span> 0-19%</span>
        </div>
      </Card>

      {/* Habit Tips - Enhanced */}
      <Card>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          💡 Personalized Habit Tips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: "🌅", title: "Morning Routine", tip: "Workout at 6 AM before university — cooler temperature, better focus", color: "orange" },
            { icon: "💧", title: "Hydration", tip: "Keep a water bottle at your desk during work (3–9 PM)", color: "cyan" },
            { icon: "📵", title: "Sleep Quality", tip: "No phone 30 min before sleep — improves sleep quality significantly", color: "indigo" },
            { icon: "🍬", title: "Nutrition", tip: "Replace sugar cravings with dates or fruit — natural energy boost", color: "green" },
          ].map((item, i) => (
            <div key={i} className={`p-4 bg-${item.color}-50 dark:bg-${item.color}-900/20 border border-${item.color}-200 dark:border-${item.color}-800 rounded-xl`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-semibold text-sm mb-1">{item.title}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{item.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Motivational Quote */}
      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200 dark:border-violet-800">
        <div className="text-center">
          <div className="text-3xl mb-3">🎯</div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">— Aristotle</p>
        </div>
      </Card>
    </div>
  );
}

// Enhanced Smart input per habit type
function HabitInput({ habit, current, onLog }) {
  if (habit.category === "sleep" || habit.category === "digital") {
    return (
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Enter {habit.unit}</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.5"
            className="input text-sm py-2"
            placeholder={`e.g., 7.5`}
            defaultValue={current || ""}
            onBlur={e => { if (e.target.value) onLog(habit.id, parseFloat(e.target.value)); }}
          />
          <span className="text-sm text-gray-400 whitespace-nowrap">{habit.unit}</span>
        </div>
      </div>
    );
  }
  if (habit.category === "activity") {
    return (
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Log your steps</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            className="input text-sm py-2"
            placeholder="e.g., 5000"
            defaultValue={current || ""}
            onBlur={e => { if (e.target.value) onLog(habit.id, parseInt(e.target.value)); }}
          />
          <span className="text-sm text-gray-400">steps</span>
        </div>
      </div>
    );
  }
  // Toggle for binary habits (workout, no sugar)
  if (habit.target === 1) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => onLog(habit.id, 0)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            current < 1 ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
          }`}
        >
          Not Done
        </button>
        <button
          onClick={() => onLog(habit.id, 1)}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
            current >= 1 ? "bg-teal-500 text-white shadow-md" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          }`}
        >
          ✓ Completed
        </button>
      </div>
    );
  }
  // Counter for water
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Adjust count</label>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onLog(habit.id, Math.max(0, current - 1))} 
          className="btn-secondary w-10 h-10 flex items-center justify-center p-0 text-xl rounded-xl"
        >
          −
        </button>
        <div className="flex-1 text-center">
          <div className="text-2xl font-bold">{current}</div>
          <div className="text-xs text-gray-400">{habit.unit}</div>
        </div>
        <button 
          onClick={() => onLog(habit.id, current + 1)} 
          className="btn-primary w-10 h-10 flex items-center justify-center p-0 text-xl rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}
