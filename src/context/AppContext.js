import React, { createContext, useContext, useReducer, useEffect } from "react";
import { INITIAL_TASKS, HABITS, PRAYERS, WEIGHT_LOG } from "../data/mockData";

const AppContext = createContext();

const today = new Date().toISOString().split("T")[0];

const initialState = {
  // Theme
  darkMode: false,

  // Prayer
  prayers: PRAYERS.reduce((acc, p) => ({ ...acc, [p]: false }), {}),
  prayerStreak: 0,
  quranPages: 0,

  // Water
  waterGlasses: 0,
  waterGoal: 8,

  // Tasks
  tasks: INITIAL_TASKS,

  // Habits
  habits: HABITS,
  habitLog: {},

  // Fitness
  workoutDone: false,
  activeWorkout: null,
  steps: 0,
  weightLog: WEIGHT_LOG,
  currentWeight: 0,
  caloriesBurned: 0,

  // Streaks
  streaks: { prayer: 0, workout: 0, water: 0, tasks: 0 },

  // Food & Calories
  dailyCalorieGoal: 1800,
  maintenanceCalories: 2200,
  caloriesConsumed: 0,
  foodLog: [], // { id, name, calories, time, meal, protein, carbs, fats }
  
  // Nutrition Targets
  proteinTarget: 110, // grams
  carbsTarget: 200, // grams
  fatsTarget: 55, // grams
  proteinConsumed: 0,
  carbsConsumed: 0,
  fatsConsumed: 0,
  
  // User Profile
  userProfile: {
    age: 22,
    gender: "male",
    height: 165, // cm
    weight: 68, // kg
    activityLevel: "beginner",
    goal: "fat-loss",
  },

  // Date
  today,
  dailyHistory: {}, // { "2025-01-15": { prayers, water, workout, calories, tasks, caloriesConsumed } }

  // Budget
  monthlyBudget: 15000,
  budgetTransactions: [], // { id, title, amount, type: "income"|"expense", category, date }
};

function loadState() {
  try {
    const saved = localStorage.getItem("lifeAssistantState");
    if (!saved) return initialState;
    const parsed = JSON.parse(saved);

    // Force-fix corrupted budget fields
    if (!Array.isArray(parsed.budgetTransactions)) {
      parsed.budgetTransactions = [];
    }
    if (!parsed.monthlyBudget || typeof parsed.monthlyBudget !== "number") {
      parsed.monthlyBudget = 15000;
    }
    // Reset daily fields if it's a new day, but save yesterday into dailyHistory first
    if (parsed.today !== today) {
      const todayTasks = (parsed.tasks || []).filter(t => t.dueDate === parsed.today);
      const completedTasks = todayTasks.filter(t => t.completed).length;
      const snapshot = {
        prayers: Object.values(parsed.prayers || {}).filter(Boolean).length,
        water: parsed.waterGlasses || 0,
        workout: parsed.workoutDone ? 1 : 0,
        calories: parsed.caloriesBurned || 0,
        caloriesConsumed: (parsed.foodLog || []).reduce((s, f) => s + (Number(f.calories) || 0), 0),
        tasks: completedTasks,
      };
      return {
        ...parsed,
        today,
        dailyHistory: { ...(parsed.dailyHistory || {}), [parsed.today]: snapshot },
        prayers: PRAYERS.reduce((acc, p) => ({ ...acc, [p]: false }), {}),
        waterGlasses: 0,
        workoutDone: false,
        caloriesBurned: 0,
        steps: 0,
        quranPages: 0,
        caloriesConsumed: 0,
        foodLog: [],
        proteinConsumed: 0,
        carbsConsumed: 0,
        fatsConsumed: 0,
        monthlyBudget: Number(parsed.monthlyBudget) || 15000,
        budgetTransactions: Array.isArray(parsed.budgetTransactions) ? parsed.budgetTransactions : [],
      };
    }
    // Recompute macros from foodLog to fix any drift
    const foodLog = parsed.foodLog || [];
    return {
      ...parsed,
      monthlyBudget: Number(parsed.monthlyBudget) || 15000,
      budgetTransactions: Array.isArray(parsed.budgetTransactions) ? parsed.budgetTransactions : [],
      caloriesConsumed: foodLog.reduce((s, f) => s + (Number(f.calories) || 0), 0),
      proteinConsumed: foodLog.reduce((s, f) => s + (Number(f.protein) || 0), 0),
      carbsConsumed: foodLog.reduce((s, f) => s + (Number(f.carbs) || 0), 0),
      fatsConsumed: foodLog.reduce((s, f) => s + (Number(f.fats) || 0), 0),
    };
  } catch {
    return initialState;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return { ...state, darkMode: !state.darkMode };

    case "TOGGLE_PRAYER":
      return { ...state, prayers: { ...state.prayers, [action.prayer]: !state.prayers[action.prayer] } };

    case "SET_WATER":
      return { ...state, waterGlasses: Math.min(action.value, 16) };

    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.task] };

    case "TOGGLE_TASK":
      return { ...state, tasks: state.tasks.map(t => t.id === action.id ? { ...t, completed: !t.completed } : t) };

    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.id) };

    case "UPDATE_TASK":
      return { ...state, tasks: state.tasks.map(t => t.id === action.task.id ? action.task : t) };

    case "SET_WORKOUT_DONE":
      return { ...state, workoutDone: action.value, caloriesBurned: action.calories || state.caloriesBurned };

    case "SET_ACTIVE_WORKOUT":
      return { ...state, activeWorkout: action.workout };

    case "SET_STEPS":
      return { ...state, steps: action.value };

    case "LOG_WEIGHT":
      return {
        ...state,
        currentWeight: action.weight,
        weightLog: [...state.weightLog, { date: today, weight: action.weight }],
      };

    case "LOG_HABIT":
      return {
        ...state,
        habitLog: {
          ...state.habitLog,
          [today]: { ...(state.habitLog[today] || {}), [action.habitId]: action.value },
        },
      };

    case "SET_QURAN_PAGES":
      return { ...state, quranPages: action.value };

    case "SET_CALORIES":
      return { ...state, caloriesBurned: action.value };

    case "ADD_FOOD":
      return {
        ...state,
        foodLog: [...state.foodLog, action.food],
        caloriesConsumed: state.caloriesConsumed + action.food.calories,
        proteinConsumed: state.proteinConsumed + (action.food.protein || 0),
        carbsConsumed: state.carbsConsumed + (action.food.carbs || 0),
        fatsConsumed: state.fatsConsumed + (action.food.fats || 0),
      };

    case "DELETE_FOOD":
      const foodToDelete = state.foodLog.find(f => f.id === action.id);
      return {
        ...state,
        foodLog: state.foodLog.filter(f => f.id !== action.id),
        caloriesConsumed: state.caloriesConsumed - (foodToDelete?.calories || 0),
        proteinConsumed: state.proteinConsumed - (foodToDelete?.protein || 0),
        carbsConsumed: state.carbsConsumed - (foodToDelete?.carbs || 0),
        fatsConsumed: state.fatsConsumed - (foodToDelete?.fats || 0),
      };

    case "SET_CALORIE_GOAL":
      return { ...state, dailyCalorieGoal: action.value };

    case "ADD_TRANSACTION":{
      const cleanTxns = Array.isArray(state.budgetTransactions)
        ? state.budgetTransactions.filter(t => t && typeof t === "object" && t.id)
        : [];
      return { ...state, budgetTransactions: [action.transaction, ...cleanTxns] };
    }

    case "DELETE_TRANSACTION":
      return { ...state, budgetTransactions: state.budgetTransactions.filter(t => t.id !== action.id) };

    case "SET_MONTHLY_BUDGET":
      return { ...state, monthlyBudget: action.value };

    case "UPDATE_STREAK":
      return { ...state, streaks: { ...state.streaks, [action.streakType]: action.value } };

    case "SAVE_SNAPSHOT": {
      const todayTasks = (state.tasks || []).filter(t => t.dueDate === state.today);
      const snapshot = {
        prayers: Object.values(state.prayers || {}).filter(Boolean).length,
        water: state.waterGlasses || 0,
        workout: state.workoutDone ? 1 : 0,
        calories: state.caloriesBurned || 0,
        caloriesConsumed: (state.foodLog || []).reduce((s, f) => s + (Number(f.calories) || 0), 0),
        tasks: todayTasks.filter(t => t.completed).length,
      };
      return {
        ...state,
        dailyHistory: { ...(state.dailyHistory || {}), [state.today]: snapshot },
      };
    }

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("lifeAssistantState", JSON.stringify(state));
  }, [state]);

  // Keep today's snapshot in dailyHistory live so analytics updates instantly
  useEffect(() => {
    dispatch({ type: "SAVE_SNAPSHOT" });
  }, [
    state.prayers, state.waterGlasses, state.workoutDone,
    state.caloriesBurned, state.foodLog, state.tasks, state.today
  ]);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.darkMode);
  }, [state.darkMode]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
