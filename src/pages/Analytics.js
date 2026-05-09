import React, { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useApp } from "../context/AppContext";
import { Card, Badge } from "../components/ui";
import { useWeeklyStats, useStreaks, useMonthlyStats } from "../hooks/useStats";
import { BarChart2 } from "lucide-react";

export default function Analytics() {
  const { state } = useApp();
  const weeklyStats = useWeeklyStats();
  const streaks = useStreaks();
  const now = new Date();
  const monthlyStats = useMonthlyStats(now.getFullYear(), now.getMonth() + 1);
  const [activeChart, setActiveChart] = useState("overview");

  const CHARTS = ["overview", "prayers", "fitness", "weight"];

  const tooltipStyle = {
    backgroundColor: "var(--tooltip-bg, #1f2937)",
    border: "none",
    borderRadius: "12px",
    color: "#f9fafb",
    fontSize: "12px",
  };

  // Only average days that have actual data
  const activeDays = weeklyStats.filter(d => d.prayers > 0 || d.water > 0 || d.workout > 0 || d.tasks > 0);
  const daysCount = activeDays.length || 1;
  const avgPrayers = (weeklyStats.reduce((s, d) => s + d.prayers, 0) / daysCount).toFixed(1);
  const avgWater = (weeklyStats.reduce((s, d) => s + d.water, 0) / daysCount).toFixed(1);
  const avgTasks = (weeklyStats.reduce((s, d) => s + d.tasks, 0) / daysCount).toFixed(1);
  const totalWorkouts = weeklyStats.filter(d => d.workout > 0).length;

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2"><BarChart2 size={20} className="text-violet-500" /> Analytics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track your weekly progress</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Avg Prayers", value: `${avgPrayers}/5`, color: "text-violet-600" },
          { label: "Workouts", value: `${totalWorkouts}/7`, color: "text-green-600" },
          { label: "Avg Water", value: `${avgWater} gl`, color: "text-cyan-600" },
          { label: "Avg Tasks", value: `${avgTasks}/day`, color: "text-orange-600" },
        ].map(s => (
          <div key={s.label} className="card text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Streaks - fully dynamic from dailyHistory */}
      <Card>
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-sm">🔥 Current Streaks</h3>
        <div className="grid grid-cols-4 gap-3 text-center">
          {[
            { label: "Prayer", value: streaks.prayer, color: "text-violet-600", bg: "bg-violet-50 dark:bg-violet-900/20" },
            { label: "Workout", value: streaks.workout, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
            { label: "Water", value: streaks.water, color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-900/20" },
            { label: "Tasks", value: streaks.tasks, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
          ].map(s => (
            <div key={s.label} className={`p-3 rounded-xl ${s.bg}`}>
              <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.label} days</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Monthly Stats */}
      {monthlyStats && (
        <Card>
          <h3 className="font-semibold mb-3 text-sm">📅 This Month ({now.toLocaleString("default", { month: "long" })})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
              <div className="font-bold text-violet-600">{monthlyStats.perfectPrayerDays}</div>
              <div className="text-xs text-gray-400">Perfect prayer days</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="font-bold text-green-600">{monthlyStats.totalWorkouts}</div>
              <div className="text-xs text-gray-400">Total workouts</div>
            </div>
            <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
              <div className="font-bold text-cyan-600">{monthlyStats.avgWater} gl</div>
              <div className="text-xs text-gray-400">Avg water/day</div>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <div className="font-bold text-orange-600">{monthlyStats.totalCaloriesBurned}</div>
              <div className="text-xs text-gray-400">kcal burned total</div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">Based on {monthlyStats.totalDays} tracked days</p>
        </Card>
      )}

      {/* Chart Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        {CHARTS.map(c => (
          <button
            key={c}
            onClick={() => setActiveChart(c)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg capitalize transition-all ${
              activeChart === c ? "bg-white dark:bg-gray-900 shadow-sm text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Overview Chart */}
      {activeChart === "overview" && (
        <Card>
          <h3 className="font-semibold mb-4">Weekly Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyStats} barSize={12} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="prayers" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Prayers" />
              <Bar dataKey="water" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Water" />
              <Bar dataKey="tasks" fill="#10b981" radius={[4, 4, 0, 0]} name="Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Prayer Chart */}
      {activeChart === "prayers" && (
        <Card>
          <h3 className="font-semibold mb-4">Prayer Consistency</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyStats}>
              <defs>
                <linearGradient id="prayerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="prayers" stroke="#8b5cf6" fill="url(#prayerGrad)" strokeWidth={2} name="Prayers" dot={{ fill: "#8b5cf6", r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
              <div className="font-bold text-violet-600">{weeklyStats.filter(d => d.prayers === 5).length}</div>
              <div className="text-xs text-gray-400">Perfect days</div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="font-bold">{(weeklyStats.reduce((s, d) => s + d.prayers, 0) / 7).toFixed(1)}</div>
              <div className="text-xs text-gray-400">Daily avg</div>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <div className="font-bold text-orange-600">{streaks.prayer}</div>
              <div className="text-xs text-gray-400">Day streak</div>
            </div>
          </div>
        </Card>
      )}

      {/* Fitness Chart */}
      {activeChart === "fitness" && (
        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold mb-4">Calories Burned (Weekly)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyStats} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="calories" fill="#10b981" radius={[6, 6, 0, 0]} name="Calories" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <h3 className="font-semibold mb-4">Water Intake (Weekly)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyStats}>
                <defs>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="water" stroke="#06b6d4" fill="url(#waterGrad)" strokeWidth={2} name="Glasses" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* Weight Chart */}
      {activeChart === "weight" && (
        <Card>
          <h3 className="font-semibold mb-2">Weight Progress</h3>
          <div className="flex items-center gap-3 mb-4">
            <Badge color="green">
              -{(state.weightLog[0]?.weight - state.currentWeight).toFixed(1)} kg lost
            </Badge>
            <span className="text-sm text-gray-400">since {state.weightLog[0]?.date}</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={state.weightLog}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d.slice(5)} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} labelFormatter={l => `Date: ${l}`} />
              <Line type="monotone" dataKey="weight" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: "#8b5cf6", r: 5 }} name="Weight (kg)" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="font-bold">{state.weightLog[0]?.weight} kg</div>
              <div className="text-xs text-gray-400">Start</div>
            </div>
            <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
              <div className="font-bold text-violet-600">{state.currentWeight} kg</div>
              <div className="text-xs text-gray-400">Current</div>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="font-bold text-green-600">75 kg</div>
              <div className="text-xs text-gray-400">Goal</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
