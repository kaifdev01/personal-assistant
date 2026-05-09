import { useState, useEffect, useCallback } from "react";
import { useApp } from "../context/AppContext";

// Returns prayer completion count and percentage for today
export function usePrayerStats() {
  const { state } = useApp();
  const completed = Object.values(state.prayers).filter(Boolean).length;
  const total = 5;
  const percentage = Math.round((completed / total) * 100);
  return { completed, total, percentage };
}

// Returns task stats for today
export function useTaskStats() {
  const { state } = useApp();
  const today = state.today;
  const todayTasks = state.tasks.filter(t => t.dueDate === today);
  const completed = todayTasks.filter(t => t.completed).length;
  const total = todayTasks.length;
  const score = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, score, todayTasks };
}

// Returns water intake percentage
export function useWaterStats() {
  const { state } = useApp();
  return {
    glasses: state.waterGlasses,
    goal: state.waterGoal,
    percentage: Math.round((state.waterGlasses / state.waterGoal) * 100),
  };
}

// Countdown/up timer hook
export function useTimer(initialSeconds = 0, countDown = false) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds(s => {
        if (countDown && s <= 0) { setRunning(false); return 0; }
        return countDown ? s - 1 : s + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, countDown]);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback((val = initialSeconds) => { setRunning(false); setSeconds(val); }, [initialSeconds]);

  const format = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return { seconds, running, start, pause, reset, format: format(seconds) };
}

// Weekly analytics built from dailyHistory + today's live state
export function useWeeklyStats() {
  const { state } = useApp();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todayIndex = (new Date().getDay() + 6) % 7;
  const history = state.dailyHistory || {};

  return days.map((day, i) => {
    const diff = i - todayIndex;
    const d = new Date();
    d.setDate(d.getDate() + diff);
    const dateKey = d.toISOString().split("T")[0];
    // Always read from dailyHistory (today's snapshot is kept live there)
    const entry = history[dateKey] || {};
    return {
      day,
      prayers: entry.prayers || 0,
      water: entry.water || 0,
      workout: entry.workout || 0,
      calories: entry.calories || 0,
      caloriesConsumed: entry.caloriesConsumed || 0,
      tasks: entry.tasks || 0,
    };
  });
}

// Calculate real streaks from dailyHistory
export function useStreaks() {
  const { state } = useApp();
  const history = state.dailyHistory || {};

  function calcStreak(checkFn) {
    let streak = 0;
    const d = new Date();
    // Start from today and go backwards
    for (let i = 0; i < 365; i++) {
      const dateKey = d.toISOString().split("T")[0];
      const entry = history[dateKey];
      if (!entry || !checkFn(entry)) break;
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }

  return {
    prayer: calcStreak(e => e.prayers >= 5),
    workout: calcStreak(e => e.workout >= 1),
    water: calcStreak(e => e.water >= 8),
    tasks: calcStreak(e => e.tasks >= 1),
  };
}

// Monthly stats from dailyHistory
export function useMonthlyStats(year, month) {
  const { state } = useApp();
  const history = state.dailyHistory || {};
  const prefix = `${year}-${String(month).padStart(2, "0")}`;

  const days = Object.entries(history)
    .filter(([date]) => date.startsWith(prefix))
    .map(([date, entry]) => ({ date, ...entry }));

  if (days.length === 0) return null;

  return {
    totalDays: days.length,
    avgPrayers: (days.reduce((s, d) => s + (d.prayers || 0), 0) / days.length).toFixed(1),
    perfectPrayerDays: days.filter(d => d.prayers >= 5).length,
    totalWorkouts: days.reduce((s, d) => s + (d.workout || 0), 0),
    avgWater: (days.reduce((s, d) => s + (d.water || 0), 0) / days.length).toFixed(1),
    totalCaloriesBurned: days.reduce((s, d) => s + (d.calories || 0), 0),
    avgCaloriesConsumed: Math.round(days.reduce((s, d) => s + (d.caloriesConsumed || 0), 0) / days.length),
    days,
  };
}

// Habit log for today
export function useHabitToday() {
  const { state } = useApp();
  const todayLog = state.habitLog[state.today] || {};
  return todayLog;
}
