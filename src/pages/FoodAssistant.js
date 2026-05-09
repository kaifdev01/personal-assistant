import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Card, Badge, ProgressBar, CircularProgress, Modal } from "../components/ui";
import { Utensils, Plus, Trash2, TrendingUp, Target, Flame, Search, Sparkles, AlertCircle, Lightbulb } from "lucide-react";

// Comprehensive food database with calories and macros per 100g or per serving
const FOOD_DATABASE = {
  // Breakfast
  "Oats (100g)": { calories: 389, protein: 13, carbs: 66, fats: 7 },
  "Banana (1 medium)": { calories: 105, protein: 1, carbs: 27, fats: 0 },
  "Egg (1 boiled)": { calories: 78, protein: 6, carbs: 1, fats: 5 },
  "Egg (1 fried)": { calories: 90, protein: 6, carbs: 1, fats: 7 },
  "Whole wheat bread (1 slice)": { calories: 80, protein: 4, carbs: 14, fats: 1 },
  "White bread (1 slice)": { calories: 75, protein: 2, carbs: 14, fats: 1 },
  "Peanut butter (1 tbsp)": { calories: 94, protein: 4, carbs: 3, fats: 8 },
  "Milk (1 cup)": { calories: 150, protein: 8, carbs: 12, fats: 8 },
  "Yogurt (1 cup)": { calories: 150, protein: 12, carbs: 17, fats: 4 },
  "Dahi (1 cup)": { calories: 150, protein: 12, carbs: 17, fats: 4 },
  "Lassi (1 glass)": { calories: 180, protein: 8, carbs: 24, fats: 5 },
  "Sweet Lassi (1 glass)": { calories: 220, protein: 8, carbs: 35, fats: 5 },
  "Raita (1 cup)": { calories: 120, protein: 8, carbs: 12, fats: 4 },
  "Dates (3 pieces)": { calories: 66, protein: 0, carbs: 18, fats: 0 },
  "Paratha (1 piece)": { calories: 250, protein: 5, carbs: 30, fats: 12 },
  
  // Lunch/Dinner
  "Rice (1 cup cooked)": { calories: 206, protein: 4, carbs: 45, fats: 0 },
  "Brown rice (1 cup)": { calories: 218, protein: 5, carbs: 46, fats: 2 },
  "Roti/Chapati (1 piece)": { calories: 71, protein: 3, carbs: 15, fats: 1 },
  "Naan (1 piece)": { calories: 262, protein: 7, carbs: 45, fats: 5 },
  "Naan Chany (1 plate)": { calories: 450, protein: 18, carbs: 65, fats: 12 },
  "Daal (1 cup)": { calories: 230, protein: 18, carbs: 40, fats: 1 },
  "Maser Daal (1 cup)": { calories: 240, protein: 19, carbs: 42, fats: 1 },
  "Lentil soup (1 cup)": { calories: 180, protein: 12, carbs: 30, fats: 1 },
  "Chickpea curry (1 cup)": { calories: 269, protein: 15, carbs: 45, fats: 4 },
  "Chicken breast (100g)": { calories: 165, protein: 31, carbs: 0, fats: 4 },
  "Chicken curry (1 cup)": { calories: 300, protein: 25, carbs: 10, fats: 18 },
  "Chicken Karahi (1 cup)": { calories: 320, protein: 28, carbs: 8, fats: 20 },
  "Chicken Qorma (1 cup)": { calories: 380, protein: 26, carbs: 12, fats: 26 },
  "Mutton Qorma (1 cup)": { calories: 420, protein: 24, carbs: 10, fats: 32 },
  "Beef (100g)": { calories: 250, protein: 26, carbs: 0, fats: 15 },
  "Beef Karahi (1 cup)": { calories: 350, protein: 28, carbs: 8, fats: 24 },
  "Fish (100g)": { calories: 206, protein: 22, carbs: 0, fats: 12 },
  "Biryani (1 plate)": { calories: 500, protein: 20, carbs: 60, fats: 18 },
  "Chicken Biryani (1 plate)": { calories: 550, protein: 25, carbs: 65, fats: 20 },
  "Mutton Biryani (1 plate)": { calories: 600, protein: 22, carbs: 62, fats: 26 },
  "Roast Chicken (100g)": { calories: 220, protein: 28, carbs: 0, fats: 11 },
  "Roast Beef (100g)": { calories: 280, protein: 26, carbs: 0, fats: 18 },
  "Macaroni (1 plate)": { calories: 350, protein: 12, carbs: 55, fats: 8 },
  "White Macaroni (1 plate)": { calories: 320, protein: 10, carbs: 58, fats: 6 },
  
  // Vegetables
  "Salad (1 bowl)": { calories: 50, protein: 2, carbs: 10, fats: 0 },
  "Cucumber (100g)": { calories: 16, protein: 1, carbs: 4, fats: 0 },
  "Tomato (1 medium)": { calories: 22, protein: 1, carbs: 5, fats: 0 },
  "Potato (1 medium)": { calories: 163, protein: 4, carbs: 37, fats: 0 },
  "Carrot (1 medium)": { calories: 25, protein: 1, carbs: 6, fats: 0 },
  "Spinach (1 cup)": { calories: 7, protein: 1, carbs: 1, fats: 0 },
  "Mixed vegetables (1 cup)": { calories: 80, protein: 3, carbs: 15, fats: 0 },
  
  // Snacks
  "Apple (1 medium)": { calories: 95, protein: 0, carbs: 25, fats: 0 },
  "Orange (1 medium)": { calories: 62, protein: 1, carbs: 15, fats: 0 },
  "Mango (1 cup)": { calories: 99, protein: 1, carbs: 25, fats: 0 },
  "Watermelon (1 cup)": { calories: 46, protein: 1, carbs: 12, fats: 0 },
  "Nuts (handful)": { calories: 170, protein: 6, carbs: 6, fats: 15 },
  "Almonds (10 pieces)": { calories: 69, protein: 3, carbs: 2, fats: 6 },
  "Biscuits (2 pieces)": { calories: 100, protein: 1, carbs: 15, fats: 4 },
  "Samosa (1 piece)": { calories: 262, protein: 5, carbs: 30, fats: 13 },
  "Pakora (3 pieces)": { calories: 150, protein: 4, carbs: 18, fats: 7 },
  "Chana (1 cup)": { calories: 210, protein: 12, carbs: 35, fats: 3 },
  
  // Drinks
  "Tea with sugar (1 cup)": { calories: 30, protein: 0, carbs: 7, fats: 0 },
  "Tea without sugar (1 cup)": { calories: 2, protein: 0, carbs: 0, fats: 0 },
  "Coffee with sugar (1 cup)": { calories: 60, protein: 0, carbs: 15, fats: 0 },
  "Juice (1 glass)": { calories: 120, protein: 1, carbs: 28, fats: 0 },
  "Soft drink (1 can)": { calories: 140, protein: 0, carbs: 39, fats: 0 },
  "Water (any amount)": { calories: 0, protein: 0, carbs: 0, fats: 0 },
  
  // Fast Food
  "Pizza (1 slice)": { calories: 285, protein: 12, carbs: 36, fats: 10 },
  "Burger (1 piece)": { calories: 354, protein: 17, carbs: 30, fats: 18 },
  "Fries (medium)": { calories: 365, protein: 4, carbs: 48, fats: 17 },
  "Biryani (1 plate)": { calories: 500, protein: 20, carbs: 60, fats: 18 },
  "Sandwich (1 piece)": { calories: 200, protein: 8, carbs: 25, fats: 7 },
};

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];

export default function FoodAssistant() {
  const { state, dispatch } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customFood, setCustomFood] = useState({ name: "", calories: "" });
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");
  const [aiAnalysis, setAiAnalysis] = useState(null);

  const foodLog = state.foodLog || [];
  const consumed = foodLog.reduce((s, f) => s + (Number(f.calories) || 0), 0);
  const burned = Number(state.caloriesBurned) || 0;
  const goal = Number(state.dailyCalorieGoal) || 1800;
  const proteinConsumed = foodLog.reduce((s, f) => s + (Number(f.protein) || 0), 0);
  const carbsConsumed = foodLog.reduce((s, f) => s + (Number(f.carbs) || 0), 0);
  const fatsConsumed = foodLog.reduce((s, f) => s + (Number(f.fats) || 0), 0);

  const caloriesRemaining = goal - consumed;
  const calorieProgress = Math.round((consumed / goal) * 100);
  const netCalories = consumed - burned;

  // Filter food database based on search
  const filteredFoods = Object.entries(FOOD_DATABASE).filter(([name]) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function addFood(name, foodData) {
    const food = {
      id: `f${Date.now()}`,
      name,
      calories: parseInt(foodData.calories),
      protein: parseInt(foodData.protein || 0),
      carbs: parseInt(foodData.carbs || 0),
      fats: parseInt(foodData.fats || 0),
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      meal: selectedMeal,
    };
    dispatch({ type: "ADD_FOOD", food });
    setShowAddModal(false);
    setSearchQuery("");
    setCustomFood({ name: "", calories: "" });
    
    // Generate AI analysis
    generateAIAnalysis(food);
  }

  function deleteFood(id) {
    dispatch({ type: "DELETE_FOOD", id });
  }

  function generateAIAnalysis(food) {
    const remaining = state.dailyCalorieGoal - (state.caloriesConsumed + food.calories);
    const isOverGoal = remaining < 0;
    const percentOfGoal = Math.round((food.calories / state.dailyCalorieGoal) * 100);

    let message = "";
    let tips = [];
    let emoji = "";

    if (percentOfGoal > 40) {
      emoji = "⚠️";
      message = `This meal is ${percentOfGoal}% of your daily goal! That's quite high for a single meal.`;
      tips = [
        "Consider splitting this into smaller portions",
        "Add more vegetables to feel fuller with fewer calories",
        "Drink water before eating to reduce portion size",
      ];
    } else if (percentOfGoal > 25) {
      emoji = "⚡";
      message = `This meal is ${percentOfGoal}% of your daily goal. Moderate portion.`;
      tips = [
        "Good portion size for a main meal",
        "Balance with lighter meals later",
        "Stay hydrated throughout the day",
      ];
    } else {
      emoji = "✅";
      message = `This meal is ${percentOfGoal}% of your daily goal. Great portion control!`;
      tips = [
        "Perfect portion size",
        "You're on track with your goals",
        "Keep up the consistency",
      ];
    }

    if (isOverGoal) {
      tips.push("⚠️ You've exceeded your daily goal. Consider a light workout to balance it out.");
    } else if (remaining < 300) {
      tips.push("💡 You have less than 300 calories left today. Choose light snacks.");
    }

    setAiAnalysis({ emoji, message, tips, food: food.name });
    setTimeout(() => setAiAnalysis(null), 10000); // Clear after 10 seconds
  }

  // Group foods by meal
  const foodsByMeal = (state.foodLog || []).reduce((acc, food) => {
    if (!acc[food.meal]) acc[food.meal] = [];
    acc[food.meal].push(food);
    return acc;
  }, {});

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Header */}
      <div className="card bg-gradient-to-br from-orange-600 to-amber-700 text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
              <Sparkles size={20} /> AI Food Assistant
            </h2>
            <p className="text-orange-200 text-sm">Track calories, get smart recommendations</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-white text-orange-600 px-4 py-2 rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2">
            <Plus size={16} /> Add Food
          </button>
        </div>
      </div>

      {/* AI Analysis Alert */}
      {aiAnalysis && (
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200 dark:border-violet-800 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{aiAnalysis.emoji}</span>
            <div className="flex-1">
              <h3 className="font-semibold mb-1 flex items-center gap-2">
                <Sparkles size={14} className="text-violet-500" /> AI Analysis: {aiAnalysis.food}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{aiAnalysis.message}</p>
              <div className="space-y-1">
                {aiAnalysis.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="text-violet-500">•</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Calorie Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Target size={16} className="text-orange-500" /> Today's Calorie Balance
          </h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold">{consumed}</div>
              <div className="text-xs text-gray-400">consumed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">−</div>
              <div className="text-xs text-gray-400">minus</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{burned}</div>
              <div className="text-xs text-gray-400">burned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">=</div>
              <div className="text-xs text-gray-400">equals</div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${netCalories > goal ? "text-red-500" : "text-violet-600"}`}>
                {netCalories}
              </div>
              <div className="text-xs text-gray-400">net</div>
            </div>
          </div>
          <ProgressBar 
            value={consumed} 
            max={goal} 
            color={calorieProgress > 100 ? "red" : calorieProgress > 80 ? "orange" : "green"} 
            size="lg" 
          />
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Goal: {goal} kcal</span>
            <Badge color={caloriesRemaining >= 0 ? "green" : "red"}>
              {caloriesRemaining >= 0 ? `${caloriesRemaining} left` : `${Math.abs(caloriesRemaining)} over`}
            </Badge>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
          <div className="text-center">
            <CircularProgress value={consumed} max={goal} size={120} color="#f97316">
              <div>
                <div className="text-2xl font-bold">{calorieProgress}%</div>
                <div className="text-xs text-gray-400">of goal</div>
              </div>
            </CircularProgress>
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {calorieProgress < 50 ? "🟢 On track" : calorieProgress < 80 ? "🟡 Good pace" : calorieProgress < 100 ? "🟠 Almost there" : "🔴 Over goal"}
            </div>
          </div>
        </Card>
      </div>

      {/* Macros Overview */}
      <Card>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Target size={16} className="text-violet-500" /> Macronutrients Today
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Protein</span>
              <span className="text-xs font-medium">{proteinConsumed}g / {state.proteinTarget}g</span>
            </div>
            <ProgressBar value={proteinConsumed} max={state.proteinTarget} color="blue" size="sm" />
            <p className="text-xs text-gray-400 mt-1">Builds muscle, reduces hunger</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Carbs</span>
              <span className="text-xs font-medium">{carbsConsumed}g / {state.carbsTarget}g</span>
            </div>
            <ProgressBar value={carbsConsumed} max={state.carbsTarget} color="orange" size="sm" />
            <p className="text-xs text-gray-400 mt-1">Energy for workouts</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Fats</span>
              <span className="text-xs font-medium">{fatsConsumed}g / {state.fatsTarget}g</span>
            </div>
            <ProgressBar value={fatsConsumed} max={state.fatsTarget} color="yellow" size="sm" />
            <p className="text-xs text-gray-400 mt-1">Hormone health</p>
          </div>
        </div>
      </Card>

      {/* Nutrition Tips */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Lightbulb size={16} className="text-blue-500" /> Your Personalized Plan
        </h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="font-semibold text-blue-600 dark:text-blue-400">Daily Target</div>
            <div className="text-2xl font-bold mt-1">{state.dailyCalorieGoal} kcal</div>
            <div className="text-xs text-gray-500 mt-1">For steady fat loss</div>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
            <div className="font-semibold text-green-600 dark:text-green-400">Maintenance</div>
            <div className="text-2xl font-bold mt-1">{state.maintenanceCalories} kcal</div>
            <div className="text-xs text-gray-500 mt-1">To maintain weight</div>
          </div>
        </div>
        <div className="mt-3 space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <span>Expected fat loss: 0.4-0.7 kg per week</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <span>Belly will flatten in 2-3 months with consistency</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500">✓</span>
            <span>High protein helps preserve muscle during fat loss</span>
          </div>
        </div>
      </Card>

      {/* Food Log by Meal */}
      {(!state.foodLog || state.foodLog.length === 0) ? (
        <Card>
          <div className="text-center py-12">
            <Utensils size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-3" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-1">No food logged yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Start tracking your meals to get AI-powered insights</p>
            <button onClick={() => setShowAddModal(true)} className="btn-primary">
              <Plus size={16} className="inline mr-2" /> Add Your First Meal
            </button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {MEAL_TYPES.map(mealType => {
            const foods = foodsByMeal[mealType] || [];
            if (foods.length === 0) return null;
            const mealTotal = foods.reduce((sum, f) => sum + f.calories, 0);
            
            return (
              <Card key={mealType}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    {mealType === "Breakfast" && "🌅"}
                    {mealType === "Lunch" && "☀️"}
                    {mealType === "Dinner" && "🌙"}
                    {mealType === "Snack" && "🍎"}
                    {mealType}
                  </h3>
                  <Badge color="orange">{mealTotal} kcal</Badge>
                </div>
                <div className="space-y-2">
                  {foods.map(food => (
                    <div key={food.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{food.name}</div>
                        <div className="text-xs text-gray-400">{food.time}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-orange-600">{food.calories} kcal</span>
                        <button
                          onClick={() => deleteFood(food.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* AI Recommendations */}
      <Card>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-violet-500" /> Smart Recommendations
        </h3>
        <div className="space-y-3">
          {caloriesRemaining > 1000 && (
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <AlertCircle size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-sm text-blue-700 dark:text-blue-400">You have {caloriesRemaining} calories left</div>
                <div className="text-xs text-blue-600 dark:text-blue-500 mt-1">Make sure to eat enough to fuel your body. Don't skip meals!</div>
              </div>
            </div>
          )}
          {caloriesRemaining < 0 && (
            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-sm text-red-700 dark:text-red-400">You're {Math.abs(caloriesRemaining)} calories over your goal</div>
                <div className="text-xs text-red-600 dark:text-red-500 mt-1">Consider a 30-min workout to burn ~200 calories, or adjust tomorrow's intake.</div>
              </div>
            </div>
          )}
          {caloriesRemaining >= 0 && caloriesRemaining <= 1000 && (
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <TrendingUp size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-sm text-green-700 dark:text-green-400">Great job! You're on track</div>
                <div className="text-xs text-green-600 dark:text-green-500 mt-1">You have {caloriesRemaining} calories left. Perfect for a light dinner or snack.</div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Add Food Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Food">
        <div className="space-y-4">
          {/* Meal Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Meal Type</label>
            <div className="grid grid-cols-4 gap-2">
              {MEAL_TYPES.map(meal => (
                <button
                  key={meal}
                  onClick={() => setSelectedMeal(meal)}
                  className={`py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedMeal === meal
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          {/* Search Food Database */}
          <div>
            <label className="text-sm font-medium mb-2 block">Search Food Database</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="input pl-10"
                placeholder="Search for food..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Food List */}
          {searchQuery && (
            <div className="max-h-60 overflow-y-auto space-y-1">
              {filteredFoods.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No foods found</p>
              ) : (
                filteredFoods.map(([name, foodData]) => (
                  <button
                    key={name}
                    onClick={() => addFood(name, foodData)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                  >
                    <div className="flex-1">
                      <span className="text-sm font-medium">{name}</span>
                      <div className="text-xs text-gray-400 mt-0.5">P: {foodData.protein}g · C: {foodData.carbs}g · F: {foodData.fats}g</div>
                    </div>
                    <Badge color="orange">{foodData.calories} kcal</Badge>
                  </button>
                ))
              )}
            </div>
          )}

          {/* Custom Food */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <label className="text-sm font-medium mb-2 block">Or Add Custom Food</label>
            <div className="space-y-3">
              <input
                type="text"
                className="input"
                placeholder="Food name (e.g., Homemade curry)"
                value={customFood.name}
                onChange={e => setCustomFood({ ...customFood, name: e.target.value })}
              />
              <input
                type="number"
                className="input"
                placeholder="Calories (e.g., 350)"
                value={customFood.calories}
                onChange={e => setCustomFood({ ...customFood, calories: e.target.value })}
              />
              <button
                onClick={() => addFood(customFood.name, { calories: customFood.calories, protein: 0, carbs: 0, fats: 0 })}
                disabled={!customFood.name || !customFood.calories}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Custom Food
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
