import React from "react";
import { useApp } from "../context/AppContext";
import { Card, CircularProgress, ProgressBar, Badge } from "../components/ui";
import { usePrayerStats } from "../hooks/useStats";
import { PRAYERS, PRAYER_TIMES, WEEKLY_STATS } from "../data/mockData";
import { Moon, BookOpen, Flame, CheckCircle } from "lucide-react";

export default function Prayer() {
  const { state, dispatch } = useApp();
  const { completed, total } = usePrayerStats();

  const weeklyPrayerAvg = Math.round(
    WEEKLY_STATS.reduce((sum, d) => sum + d.prayers, 0) / WEEKLY_STATS.length
  );

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Card */}
      <div className="card bg-gradient-to-br from-violet-600 to-purple-700 text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Prayer Tracker</h2>
            <p className="text-violet-200 text-sm">Stay consistent with your 5 daily prayers</p>
            <div className="flex items-center gap-2 mt-3">
              <Flame size={16} className="text-orange-300" />
              <span className="font-semibold">{state.prayerStreak} day streak</span>
            </div>
          </div>
          <CircularProgress value={completed} max={5} size={90} color="#c4b5fd">
            <div className="text-center">
              <div className="text-xl font-bold">{completed}/{total}</div>
              <div className="text-xs text-violet-200">prayers</div>
            </div>
          </CircularProgress>
        </div>
      </div>

      {/* Prayer Checklist */}
      <Card>
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Moon size={16} className="text-violet-500" /> Today's Prayers</h3>
        <div className="space-y-3">
          {PRAYERS.map(prayer => {
            const done = state.prayers[prayer];
            return (
              <button
                key={prayer}
                onClick={() => dispatch({ type: "TOGGLE_PRAYER", prayer })}
                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                  done
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                    : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 hover:border-violet-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    done ? "bg-violet-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                  }`}>
                    {done ? "✓" : prayer[0]}
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{prayer}</div>
                    <div className="text-xs text-gray-400">{PRAYER_TIMES[prayer]}</div>
                  </div>
                </div>
                <Badge color={done ? "violet" : "gray"}>{done ? "Completed" : "Pending"}</Badge>
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <ProgressBar value={completed} max={5} color="violet" size="md" showLabel />
        </div>
      </Card>

      {/* Quran Reading Tracker */}
      <Card>
        <h3 className="font-semibold mb-4 flex items-center gap-2"><BookOpen size={16} className="text-green-500" /> Quran Reading</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Pages read today</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch({ type: "SET_QURAN_PAGES", value: Math.max(0, state.quranPages - 1) })}
                className="btn-secondary w-9 h-9 flex items-center justify-center text-lg p-0"
              >−</button>
              <span className="text-3xl font-bold w-12 text-center">{state.quranPages}</span>
              <button
                onClick={() => dispatch({ type: "SET_QURAN_PAGES", value: state.quranPages + 1 })}
                className="btn-primary w-9 h-9 flex items-center justify-center text-lg p-0"
              >+</button>
            </div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{state.quranPages * 7}</div>
            <div className="text-xs text-gray-400">Weekly pages</div>
          </div>
        </div>
        <ProgressBar value={state.quranPages} max={5} color="green" size="sm" className="mt-3" />
        <p className="text-xs text-gray-400 mt-1">Daily goal: 5 pages</p>
      </Card>

      {/* Weekly Stats */}
      <Card>
        <h3 className="font-semibold mb-4 flex items-center gap-2"><CheckCircle size={16} className="text-blue-500" /> Weekly Prayer Stats</h3>
        <div className="grid grid-cols-7 gap-2">
          {WEEKLY_STATS.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-xs text-gray-400">{day.day}</div>
              <div className="w-full flex flex-col gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div
                    key={j}
                    className={`h-2 rounded-sm ${j < day.prayers ? "bg-violet-500" : "bg-gray-100 dark:bg-gray-800"}`}
                  />
                ))}
              </div>
              <div className="text-xs font-medium">{day.prayers}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Weekly average</span>
          <Badge color="violet">{weeklyPrayerAvg}/5 prayers/day</Badge>
        </div>
      </Card>

      {/* Reminders */}
      <Card>
        <h3 className="font-semibold mb-3">Prayer Times (Today)</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {PRAYERS.map(prayer => (
            <div key={prayer} className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="text-xs text-gray-400 mb-1">{prayer}</div>
              <div className="font-semibold text-sm">{PRAYER_TIMES[prayer]}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
