import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Card, Toggle, Badge } from "../components/ui";
import { Settings as SettingsIcon, Trash2, Download, Info } from "lucide-react";

export default function Settings() {
  const { state, dispatch } = useApp();
  const [waterGoalInput, setWaterGoalInput] = useState(state.waterGoal);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    dispatch({ type: "SET_WATER", value: state.waterGlasses }); // trigger re-render
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleReset() {
    if (window.confirm("Reset all data? This cannot be undone.")) {
      localStorage.removeItem("lifeAssistantState");
      window.location.reload();
    }
  }

  function handleExport() {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lifeassist-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
          <SettingsIcon size={18} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Customize your experience</p>
        </div>
      </div>

      {/* Profile */}
      <Card>
        <h3 className="font-semibold mb-4">Profile</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">K</div>
          <div>
            <div className="font-semibold text-lg">Kaif</div>
            <div className="text-sm text-gray-400">Student · Worker · Fitness Enthusiast</div>
            <div className="flex gap-2 mt-2">
              <Badge color="blue">University</Badge>
              <Badge color="orange">Work 3–9PM</Badge>
              <Badge color="green">Home Workout</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card>
        <h3 className="font-semibold mb-4">Appearance</h3>
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="font-medium text-sm">Dark Mode</div>
            <div className="text-xs text-gray-400">Switch between light and dark theme</div>
          </div>
          <Toggle checked={state.darkMode} onChange={() => dispatch({ type: "TOGGLE_DARK_MODE" })} />
        </div>
      </Card>

      {/* Goals */}
      <Card>
        <h3 className="font-semibold mb-4">Daily Goals</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Daily Water Goal (glasses)</label>
            <div className="flex gap-3">
              <input
                type="number"
                className="input"
                value={waterGoalInput}
                min={4}
                max={20}
                onChange={e => setWaterGoalInput(parseInt(e.target.value))}
              />
              <button onClick={handleSave} className="btn-primary whitespace-nowrap">
                {saved ? "Saved ✓" : "Save"}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Weight Goal (kg)</label>
            <input type="number" className="input" defaultValue={75} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Daily Step Goal</label>
            <input type="number" className="input" defaultValue={5000} />
          </div>
        </div>
      </Card>

      {/* Personal Info */}
      <Card>
        <h3 className="font-semibold mb-4">Personal Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Age</label>
            <input type="number" className="input" placeholder="e.g. 21" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Height (cm)</label>
            <input type="number" className="input" placeholder="e.g. 175" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Current Weight (kg)</label>
            <input type="number" className="input" defaultValue={state.currentWeight} />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Activity Level</label>
            <select className="input">
              <option>Sedentary</option>
              <option selected>Lightly Active</option>
              <option>Moderately Active</option>
              <option>Very Active</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <h3 className="font-semibold mb-4">Reminders</h3>
        <div className="space-y-3">
          {[
            { label: "Prayer Reminders", desc: "Get notified before each prayer time" },
            { label: "Water Reminders", desc: "Reminder every 2 hours to drink water" },
            { label: "Workout Reminder", desc: "Daily workout reminder at 6 AM" },
            { label: "Task Reminders", desc: "Reminder for due tasks" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <div>
                <div className="font-medium text-sm">{item.label}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
              <Toggle checked={i < 2} onChange={() => {}} />
            </div>
          ))}
        </div>
      </Card>

      {/* Data Management */}
      <Card>
        <h3 className="font-semibold mb-4">Data Management</h3>
        <div className="space-y-3">
          <button onClick={handleExport} className="btn-secondary w-full flex items-center justify-center gap-2">
            <Download size={16} /> Export Data (JSON)
          </button>
          <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium px-4 py-2 rounded-xl transition-all">
            <Trash2 size={16} /> Reset All Data
          </button>
        </div>
      </Card>

      {/* App Info */}
      <Card>
        <div className="flex items-start gap-3">
          <Info size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-sm">LifeAssist v1.0</div>
            <div className="text-xs text-gray-400 mt-1">
              Personal Life Assistant — Built with React, Tailwind CSS, Recharts.<br />
              Data stored locally in your browser. No account required.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
