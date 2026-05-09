import React, { useState } from "react";
import { Card, Badge } from "../components/ui";
import { AI_SUGGESTIONS } from "../data/mockData";
import { Zap, ChevronDown, ChevronUp } from "lucide-react";

const MEAL_PLANS = [
  {
    meal: "Breakfast",
    icon: "🌅",
    options: [
      "Oats + banana + 1 boiled egg (cheap, filling, slow energy)",
      "Whole wheat bread + peanut butter + milk",
      "Yogurt + dates + handful of nuts",
    ],
  },
  {
    meal: "Lunch",
    icon: "☀️",
    options: [
      "Lentil soup + salad + 1 roti (high protein, budget-friendly)",
      "Rice + daal + cucumber salad",
      "Chickpea curry + brown rice",
    ],
  },
  {
    meal: "Dinner",
    icon: "🌙",
    options: [
      "2 eggs + sautéed veggies + 1 roti (light, high protein)",
      "Grilled chicken (if budget allows) + salad",
      "Lentils + steamed vegetables",
    ],
  },
  {
    meal: "Snacks",
    icon: "⚡",
    options: [
      "Dates + water (natural energy, no sugar crash)",
      "Banana + peanut butter",
      "Handful of mixed nuts",
    ],
  },
];

const WORKOUT_PLANS = [
  {
    day: "Monday",
    focus: "Upper Body",
    exercises: ["Push-ups 4×15", "Tricep Dips 3×12", "Pike Push-ups 3×10", "Plank 3×45s"],
  },
  {
    day: "Tuesday",
    focus: "Lower Body",
    exercises: ["Squats 4×20", "Lunges 3×12 each", "Glute Bridges 3×20", "Calf Raises 3×25"],
  },
  {
    day: "Wednesday",
    focus: "HIIT Cardio",
    exercises: ["Jumping Jacks 3×30s", "High Knees 3×30s", "Burpees 3×10", "Mountain Climbers 3×30s"],
  },
  {
    day: "Thursday",
    focus: "Core",
    exercises: ["Crunches 3×20", "Leg Raises 3×15", "Russian Twists 3×20", "Bicycle Crunches 3×30s"],
  },
  {
    day: "Friday",
    focus: "Full Body",
    exercises: ["Push-ups 3×15", "Squats 3×20", "Burpees 3×8", "Plank 3×45s"],
  },
  { day: "Saturday", focus: "Active Recovery", exercises: ["30-min walk", "Stretching 15 min", "Yoga / breathing"] },
  { day: "Sunday", focus: "Rest Day", exercises: ["Full rest", "Light stretching only", "Meal prep for the week"] },
];

export default function AIAssistant() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);

  const typeColors = {
    workout: "violet",
    hydration: "cyan",
    schedule: "blue",
    meal: "green",
    motivation: "orange",
    recovery: "indigo",
  };

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="card bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 text-white border-0">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Zap size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Life Assistant</h2>
            <p className="text-violet-200 text-sm">Personalized for your student-worker lifestyle</p>
          </div>
        </div>
        <div className="mt-3 p-3 bg-white/10 rounded-xl text-sm text-violet-100">
          🎯 Goal: Fat loss + discipline + productivity — optimized for 35–45°C summer heat, no gym, limited budget.
        </div>
      </div>

      {/* AI Suggestion Cards */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">Smart Suggestions</h3>
        {AI_SUGGESTIONS.map((s, i) => (
          <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow" glass>
            <button className="w-full text-left" onClick={() => setExpandedCard(expandedCard === i ? null : i)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{s.title}</span>
                      <Badge color={typeColors[s.type]}>{s.type}</Badge>
                    </div>
                    {expandedCard !== i && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{s.message}</p>
                    )}
                  </div>
                </div>
                {expandedCard === i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </div>
              {expandedCard === i && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed animate-fade-in">{s.message}</p>
              )}
            </button>
          </Card>
        ))}
      </div>

      {/* Weekly Workout Plan */}
      <div>
        <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">7-Day Home Workout Plan</h3>
        <div className="space-y-2">
          {WORKOUT_PLANS.map((plan, i) => (
            <Card key={i}>
              <button className="w-full text-left" onClick={() => setExpandedDay(expandedDay === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                      plan.focus === "Rest Day" ? "bg-gray-100 dark:bg-gray-800 text-gray-400" : "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400"
                    }`}>
                      {plan.day.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{plan.day}</div>
                      <div className="text-xs text-gray-400">{plan.focus}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge color={plan.focus === "Rest Day" ? "gray" : plan.focus === "Active Recovery" ? "cyan" : "violet"}>
                      {plan.focus}
                    </Badge>
                    {expandedDay === i ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                  </div>
                </div>
                {expandedDay === i && (
                  <div className="mt-3 space-y-1.5 animate-fade-in">
                    {plan.exercises.map((ex, j) => (
                      <div key={j} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                        <span className="text-sm">{ex}</span>
                      </div>
                    ))}
                  </div>
                )}
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* Meal Plans */}
      <div>
        <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Budget-Friendly Meal Plan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MEAL_PLANS.map((meal, i) => (
            <Card key={i}>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <span>{meal.icon}</span> {meal.meal}
              </h4>
              <div className="space-y-2">
                {meal.options.map((opt, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Motivational Section */}
      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
        <h3 className="font-semibold mb-3 flex items-center gap-2">🔥 Your Personal Coach Says:</h3>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <p>You're juggling university, work, and self-improvement — that's already harder than most people's full-time job.</p>
          <p>You don't need a gym. You don't need a big budget. You need <strong>20 minutes</strong> and <strong>consistency</strong>.</p>
          <p>Every prayer you complete, every glass of water you drink, every task you finish — it compounds. <strong>Trust the process.</strong></p>
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl font-medium text-orange-700 dark:text-orange-400">
            "The man who moves a mountain begins by carrying away small stones." — Confucius
          </div>
        </div>
      </Card>
    </div>
  );
}
