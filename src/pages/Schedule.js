import React, { useState } from "react";
import { Card, Badge } from "../components/ui";
import { SCHEDULE } from "../data/mockData";
import { Calendar, Clock, Sun, Moon, AlertTriangle } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TYPE_COLORS = {
  university: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-300 dark:border-blue-700", dot: "bg-blue-500" },
  work: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", border: "border-orange-300 dark:border-orange-700", dot: "bg-orange-500" },
  fitness: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-300 dark:border-green-700", dot: "bg-green-500" },
};

const SMART_ROUTINE = [
  { time: "04:45", label: "Fajr Prayer", icon: "🌙", type: "prayer" },
  { time: "05:00–05:30", label: "Sleep / Rest", icon: "😴", type: "rest" },
  { time: "06:00–06:45", label: "Home Workout (HIIT/Strength)", icon: "💪", type: "fitness", note: "Best time — cool temp, fasted cardio" },
  { time: "07:00–07:30", label: "Shower + Breakfast", icon: "🍳", type: "personal" },
  { time: "08:00–14:00", label: "University", icon: "🎓", type: "university" },
  { time: "12:30", label: "Dhuhr Prayer", icon: "🌤️", type: "prayer" },
  { time: "14:00–14:30", label: "Lunch + Rest", icon: "🥗", type: "personal" },
  { time: "14:30–15:00", label: "Quick Study / Revision", icon: "📚", type: "university" },
  { time: "15:00–21:00", label: "Work Shift", icon: "💼", type: "work" },
  { time: "16:00", label: "Asr Prayer", icon: "🌅", type: "prayer" },
  { time: "19:45", label: "Maghrib Prayer", icon: "🌇", type: "prayer" },
  { time: "21:00–21:30", label: "Dinner", icon: "🍽️", type: "personal" },
  { time: "21:15", label: "Isha Prayer", icon: "🌙", type: "prayer" },
  { time: "21:30–22:00", label: "Evening Walk (if not worked out)", icon: "🚶", type: "fitness", note: "Cooler at night — safe for outdoor activity" },
  { time: "22:00–22:30", label: "Wind Down / No screens", icon: "📵", type: "personal" },
  { time: "22:30", label: "Sleep", icon: "💤", type: "rest" },
];

const ROUTINE_COLORS = {
  prayer: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800",
  fitness: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  university: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
  work: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
  personal: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
  rest: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
};

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState(DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  const [activeTab, setActiveTab] = useState("routine");

  const daySchedule = SCHEDULE.filter(s => s.days.includes(selectedDay));

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="card bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0">
        <div className="flex items-center gap-3 mb-2">
          <Calendar size={20} />
          <h2 className="text-xl font-bold">Schedule Planner</h2>
        </div>
        <p className="text-blue-200 text-sm">University 8AM–2PM · Work 3PM–9PM · Optimized for your lifestyle</p>
      </div>

      {/* Heat Warning */}
      <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
        <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-red-700 dark:text-red-400">Summer Heat Warning (35–45°C)</p>
          <p className="text-xs text-red-600 dark:text-red-500 mt-0.5">
            Avoid outdoor activity between 10 AM – 6 PM. Best workout windows: <strong>6–7 AM</strong> or <strong>9–10 PM</strong>.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
        {["routine", "weekly"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-medium rounded-lg capitalize transition-all ${
              activeTab === tab ? "bg-white dark:bg-gray-900 shadow-sm text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {tab === "routine" ? "Smart Daily Routine" : "Weekly Schedule"}
          </button>
        ))}
      </div>

      {/* Smart Daily Routine */}
      {activeTab === "routine" && (
        <Card>
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Clock size={16} className="text-blue-500" /> Optimized Daily Routine</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-gray-100 dark:bg-gray-800" />
            <div className="space-y-2">
              {SMART_ROUTINE.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-[52px] text-right flex-shrink-0">
                    <span className="text-xs text-gray-400 leading-tight">{item.time.split("–")[0]}</span>
                  </div>
                  <div className={`flex-1 p-3 rounded-xl border text-sm ${ROUTINE_COLORS[item.type]} ml-3`}>
                    <div className="flex items-center gap-2">
                      <span>{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.note && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">{item.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Weekly Schedule */}
      {activeTab === "weekly" && (
        <div className="space-y-4">
          {/* Day selector */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {DAYS.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedDay === day ? "bg-violet-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Day schedule */}
          <Card>
            <h3 className="font-semibold mb-4">{selectedDay}'s Schedule</h3>
            {daySchedule.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Calendar size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No scheduled events</p>
              </div>
            ) : (
              <div className="space-y-3">
                {daySchedule.map(item => {
                  const colors = TYPE_COLORS[item.type] || TYPE_COLORS.university;
                  return (
                    <div key={item.id} className={`flex items-center gap-4 p-4 rounded-xl border ${colors.bg} ${colors.border}`}>
                      <div className={`w-2 h-10 rounded-full ${colors.dot}`} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className={`text-xs mt-0.5 ${colors.text}`}>{item.startTime} – {item.endTime}</div>
                      </div>
                      <Badge color={item.type === "university" ? "blue" : item.type === "work" ? "orange" : "green"}>
                        {item.type}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Workout Suggestions */}
          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sun size={16} className="text-yellow-500" /> Workout Windows for {selectedDay}
            </h3>
            <div className="space-y-2">
              {[
                { time: "6:00–6:45 AM", label: "Morning HIIT", icon: "🌅", recommended: true, note: "Fasted cardio — max fat burn" },
                { time: "9:00–10:00 PM", label: "Evening Strength", icon: "🌙", recommended: true, note: "After work — cooler temperature" },
                { time: "2:00–2:30 PM", label: "Quick Core", icon: "⚡", recommended: false, note: "Between uni & work — short session only" },
              ].map((w, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${w.recommended ? "bg-green-50 dark:bg-green-900/20" : "bg-gray-50 dark:bg-gray-800"}`}>
                  <span className="text-lg">{w.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{w.label}</span>
                      {w.recommended && <Badge color="green">Recommended</Badge>}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{w.time} · {w.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
