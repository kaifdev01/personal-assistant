// Mock data for the Personal Life Assistant App

export const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

export const PRAYER_TIMES = {
  Fajr: "04:45",
  Dhuhr: "12:30",
  Asr: "16:00",
  Maghrib: "19:45",
  Isha: "21:15",
};

export const MOTIVATIONAL_QUOTES = [
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "You don't have to be extreme, just consistent.", author: "Unknown" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
];

// 12-Week Fat Loss Program - Phase 1 (Weeks 1-4)
const PHASE1_WORKOUTS = [
  {
    id: "p1d1",
    name: "Day 1: Full Body A",
    phase: 1,
    week: "1-4",
    duration: 45,
    calories: 200,
    difficulty: "Beginner",
    type: "Strength",
    exercises: [
      { name: "Bodyweight Squats", sets: 3, reps: "15", rest: "60 sec" },
      { name: "Knee Push-Ups", sets: 3, reps: "10", rest: "60 sec" },
      { name: "Reverse Lunges", sets: 3, reps: "10 each", rest: "60 sec" },
      { name: "Mountain Climbers", sets: 3, reps: "20", rest: "60 sec" },
      { name: "Glute Bridges", sets: 3, reps: "15", rest: "60 sec" },
      { name: "Forearm Plank", sets: 3, reps: "30 sec", rest: "60 sec" },
      { name: "Jumping Jacks", sets: 3, reps: "40", rest: "60 sec" },
    ],
  },
  {
    id: "p1d2",
    name: "Day 2: Cardio + Core",
    phase: 1,
    week: "1-4",
    duration: 30,
    calories: 180,
    difficulty: "Beginner",
    type: "HIIT",
    exercises: [
      { name: "Fast Walking/Jogging", sets: 1, reps: "25 min", rest: "0" },
      { name: "Crunches", sets: 3, reps: "20", rest: "30 sec" },
      { name: "Bicycle Crunches", sets: 3, reps: "20", rest: "30 sec" },
      { name: "Leg Raises", sets: 3, reps: "12", rest: "30 sec" },
      { name: "Russian Twists", sets: 3, reps: "20", rest: "30 sec" },
      { name: "Flutter Kicks", sets: 3, reps: "20 sec", rest: "30 sec" },
      { name: "Plank", sets: 3, reps: "30 sec", rest: "30 sec" },
    ],
  },
  {
    id: "p1d3",
    name: "Day 3: Full Body B",
    phase: 1,
    week: "1-4",
    duration: 45,
    calories: 200,
    difficulty: "Beginner",
    type: "Strength",
    exercises: [
      { name: "Static Squat Hold", sets: 3, reps: "30 sec", rest: "60 sec" },
      { name: "Incline Push-Ups", sets: 3, reps: "12", rest: "60 sec" },
      { name: "Step Back Lunges", sets: 3, reps: "12 each", rest: "60 sec" },
      { name: "High Knees", sets: 3, reps: "30 sec", rest: "60 sec" },
      { name: "Superman Hold", sets: 3, reps: "30 sec", rest: "60 sec" },
      { name: "Dead Bug", sets: 3, reps: "15", rest: "60 sec" },
      { name: "Plank Shoulder Taps", sets: 3, reps: "20", rest: "60 sec" },
    ],
  },
  {
    id: "p1d4",
    name: "Day 4: Mobility + Abs",
    phase: 1,
    week: "1-4",
    duration: 30,
    calories: 100,
    difficulty: "Beginner",
    type: "Core",
    exercises: [
      { name: "Hip Rotations", sets: 2, reps: "10 each", rest: "30 sec" },
      { name: "Arm Circles", sets: 2, reps: "20", rest: "30 sec" },
      { name: "Bodyweight Good Mornings", sets: 2, reps: "15", rest: "30 sec" },
      { name: "Crunches", sets: 3, reps: "20", rest: "30 sec" },
      { name: "Bicycle Crunches", sets: 3, reps: "20", rest: "30 sec" },
      { name: "Leg Raises", sets: 3, reps: "12", rest: "30 sec" },
      { name: "Plank", sets: 3, reps: "30 sec", rest: "30 sec" },
    ],
  },
  {
    id: "p1d6",
    name: "Day 6: Fat Burn Circuit",
    phase: 1,
    week: "1-4",
    duration: 35,
    calories: 220,
    difficulty: "Beginner",
    type: "HIIT",
    exercises: [
      { name: "Jumping Jacks", sets: 3, reps: "50", rest: "45 sec" },
      { name: "Bodyweight Squats", sets: 3, reps: "20", rest: "45 sec" },
      { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "45 sec" },
      { name: "High Knees", sets: 3, reps: "30 sec", rest: "45 sec" },
      { name: "Burpees", sets: 3, reps: "8", rest: "60 sec" },
      { name: "Plank", sets: 3, reps: "40 sec", rest: "45 sec" },
    ],
  },
];

// Phase 2 (Weeks 5-8)
const PHASE2_WORKOUTS = [
  {
    id: "p2d1",
    name: "Day 1: HIIT Conditioning",
    phase: 2,
    week: "5-8",
    duration: 40,
    calories: 280,
    difficulty: "Intermediate",
    type: "HIIT",
    exercises: [
      { name: "Jump Squats", sets: 4, reps: "40 sec", rest: "20 sec" },
      { name: "Push-Ups", sets: 4, reps: "40 sec", rest: "20 sec" },
      { name: "Burpees", sets: 4, reps: "40 sec", rest: "20 sec" },
      { name: "Mountain Climbers", sets: 4, reps: "40 sec", rest: "20 sec" },
      { name: "High Knees", sets: 4, reps: "40 sec", rest: "20 sec" },
      { name: "Plank Jacks", sets: 4, reps: "40 sec", rest: "90 sec" },
    ],
  },
  {
    id: "p2d2",
    name: "Day 2: Lower Body + Core",
    phase: 2,
    week: "5-8",
    duration: 45,
    calories: 250,
    difficulty: "Intermediate",
    type: "Strength",
    exercises: [
      { name: "Squats", sets: 4, reps: "20", rest: "60 sec" },
      { name: "Walking Lunges", sets: 4, reps: "14 each", rest: "60 sec" },
      { name: "Glute Bridges", sets: 4, reps: "20", rest: "60 sec" },
      { name: "Wall Sit", sets: 4, reps: "45 sec", rest: "60 sec" },
      { name: "Calf Raises", sets: 4, reps: "25", rest: "45 sec" },
      { name: "Plank", sets: 4, reps: "45 sec", rest: "45 sec" },
      { name: "Reverse Crunches", sets: 4, reps: "15", rest: "45 sec" },
    ],
  },
  {
    id: "p2d3",
    name: "Day 3: Cardio Endurance",
    phase: 2,
    week: "5-8",
    duration: 35,
    calories: 200,
    difficulty: "Intermediate",
    type: "HIIT",
    exercises: [
      { name: "Fast Walking/Jogging", sets: 1, reps: "30 min", rest: "0" },
      { name: "High Knees", sets: 3, reps: "45 sec", rest: "30 sec" },
      { name: "Jumping Jacks", sets: 3, reps: "60", rest: "30 sec" },
    ],
  },
  {
    id: "p2d4",
    name: "Day 4: Upper Body + Abs",
    phase: 2,
    week: "5-8",
    duration: 45,
    calories: 230,
    difficulty: "Intermediate",
    type: "Strength",
    exercises: [
      { name: "Push-Ups", sets: 4, reps: "15", rest: "60 sec" },
      { name: "Pike Push-Ups", sets: 4, reps: "10", rest: "60 sec" },
      { name: "Chair Dips", sets: 4, reps: "15", rest: "60 sec" },
      { name: "Plank Shoulder Taps", sets: 4, reps: "20", rest: "45 sec" },
      { name: "Bicycle Crunches", sets: 4, reps: "30", rest: "45 sec" },
      { name: "Heel Touches", sets: 4, reps: "25", rest: "45 sec" },
      { name: "Side Plank", sets: 4, reps: "30 sec each", rest: "45 sec" },
    ],
  },
  {
    id: "p2d5",
    name: "Day 5: Full Body HIIT",
    phase: 2,
    week: "5-8",
    duration: 40,
    calories: 300,
    difficulty: "Intermediate",
    type: "HIIT",
    exercises: [
      { name: "Burpees", sets: 4, reps: "12", rest: "60 sec" },
      { name: "Jump Squats", sets: 4, reps: "15", rest: "60 sec" },
      { name: "Mountain Climbers", sets: 4, reps: "45 sec", rest: "60 sec" },
      { name: "Push-Ups", sets: 4, reps: "15", rest: "60 sec" },
      { name: "High Knees", sets: 4, reps: "45 sec", rest: "60 sec" },
      { name: "Plank", sets: 4, reps: "60 sec", rest: "60 sec" },
    ],
  },
  {
    id: "p2d6",
    name: "Day 6: Belly Fat Burner",
    phase: 2,
    week: "5-8",
    duration: 35,
    calories: 280,
    difficulty: "Intermediate",
    type: "HIIT",
    exercises: [
      { name: "Burpees", sets: 5, reps: "10", rest: "30 sec" },
      { name: "Mountain Climbers", sets: 5, reps: "30 sec", rest: "30 sec" },
      { name: "Jumping Jacks", sets: 5, reps: "50", rest: "30 sec" },
      { name: "High Knees", sets: 5, reps: "30 sec", rest: "30 sec" },
      { name: "Plank", sets: 5, reps: "45 sec", rest: "30 sec" },
      { name: "Leg Raises", sets: 5, reps: "15", rest: "30 sec" },
    ],
  },
];

// Phase 3 (Weeks 9-12)
const PHASE3_WORKOUTS = [
  {
    id: "p3d1",
    name: "Day 1: Advanced HIIT",
    phase: 3,
    week: "9-12",
    duration: 50,
    calories: 350,
    difficulty: "Advanced",
    type: "HIIT",
    exercises: [
      { name: "Burpees", sets: 5, reps: "45 sec", rest: "15 sec" },
      { name: "Jump Squats", sets: 5, reps: "45 sec", rest: "15 sec" },
      { name: "Push-Ups", sets: 5, reps: "45 sec", rest: "15 sec" },
      { name: "Mountain Climbers", sets: 5, reps: "45 sec", rest: "15 sec" },
      { name: "High Knees", sets: 5, reps: "45 sec", rest: "15 sec" },
      { name: "Plank Jacks", sets: 5, reps: "45 sec", rest: "15 sec" },
      { name: "Skater Hops", sets: 5, reps: "45 sec", rest: "90 sec" },
    ],
  },
  {
    id: "p3d2",
    name: "Day 2: Strength Conditioning",
    phase: 3,
    week: "9-12",
    duration: 50,
    calories: 300,
    difficulty: "Advanced",
    type: "Strength",
    exercises: [
      { name: "Squats", sets: 5, reps: "25", rest: "60 sec" },
      { name: "Push-Ups", sets: 5, reps: "20", rest: "60 sec" },
      { name: "Walking Lunges", sets: 5, reps: "20 each", rest: "60 sec" },
      { name: "Pike Push-Ups", sets: 5, reps: "15", rest: "60 sec" },
      { name: "Glute Bridges", sets: 5, reps: "25", rest: "45 sec" },
      { name: "Plank", sets: 5, reps: "90 sec", rest: "60 sec" },
    ],
  },
  {
    id: "p3d3",
    name: "Day 3: Cardio Intervals",
    phase: 3,
    week: "9-12",
    duration: 40,
    calories: 250,
    difficulty: "Advanced",
    type: "HIIT",
    exercises: [
      { name: "Sprint Intervals", sets: 8, reps: "30 sec", rest: "30 sec" },
      { name: "High Knees", sets: 5, reps: "45 sec", rest: "30 sec" },
      { name: "Burpees", sets: 5, reps: "15", rest: "45 sec" },
      { name: "Jumping Jacks", sets: 5, reps: "60", rest: "30 sec" },
    ],
  },
  {
    id: "p3d4",
    name: "Day 4: Core Destruction",
    phase: 3,
    week: "9-12",
    duration: 40,
    calories: 200,
    difficulty: "Advanced",
    type: "Core",
    exercises: [
      { name: "V-Ups", sets: 5, reps: "15", rest: "45 sec" },
      { name: "Bicycle Crunches", sets: 5, reps: "35", rest: "45 sec" },
      { name: "Toe Touches", sets: 5, reps: "20", rest: "45 sec" },
      { name: "Hollow Hold", sets: 5, reps: "30 sec", rest: "45 sec" },
      { name: "Russian Twists", sets: 5, reps: "35", rest: "45 sec" },
      { name: "Leg Raises", sets: 5, reps: "15", rest: "45 sec" },
      { name: "Forearm Plank", sets: 5, reps: "60 sec", rest: "45 sec" },
    ],
  },
  {
    id: "p3d5",
    name: "Day 5: Full Body Athlete Circuit",
    phase: 3,
    week: "9-12",
    duration: 55,
    calories: 380,
    difficulty: "Advanced",
    type: "HIIT",
    exercises: [
      { name: "Squat Pulses", sets: 5, reps: "20", rest: "60 sec" },
      { name: "Push-Ups", sets: 5, reps: "20", rest: "60 sec" },
      { name: "Walking Lunges", sets: 5, reps: "15 each", rest: "60 sec" },
      { name: "Burpees", sets: 5, reps: "12", rest: "60 sec" },
      { name: "Plank Shoulder Taps", sets: 5, reps: "25", rest: "45 sec" },
      { name: "Jumping Jacks", sets: 5, reps: "60", rest: "45 sec" },
      { name: "Wall Sit", sets: 5, reps: "60 sec", rest: "60 sec" },
    ],
  },
  {
    id: "p3d6",
    name: "Day 6: Long Fat Burn Session",
    phase: 3,
    week: "9-12",
    duration: 60,
    calories: 400,
    difficulty: "Advanced",
    type: "HIIT",
    exercises: [
      { name: "Fast Walking/Jogging", sets: 1, reps: "45 min", rest: "0" },
      { name: "Burpees", sets: 3, reps: "15", rest: "60 sec" },
      { name: "Mountain Climbers", sets: 3, reps: "60 sec", rest: "60 sec" },
      { name: "Plank", sets: 3, reps: "90 sec", rest: "60 sec" },
    ],
  },
];

// Quick workouts (original ones)
const QUICK_WORKOUTS = [
  {
    id: "w1",
    name: "Morning Fat Burn",
    duration: 20,
    calories: 180,
    difficulty: "Beginner",
    type: "HIIT",
    exercises: [
      { name: "Jumping Jacks", sets: 3, reps: "30 sec", rest: "10 sec" },
      { name: "High Knees", sets: 3, reps: "30 sec", rest: "10 sec" },
      { name: "Burpees", sets: 3, reps: "10", rest: "20 sec" },
      { name: "Mountain Climbers", sets: 3, reps: "30 sec", rest: "15 sec" },
      { name: "Jump Squats", sets: 3, reps: "15", rest: "20 sec" },
    ],
  },
  {
    id: "w2",
    name: "Core Destroyer",
    duration: 15,
    calories: 120,
    difficulty: "Intermediate",
    type: "Core",
    exercises: [
      { name: "Plank", sets: 3, reps: "45 sec", rest: "15 sec" },
      { name: "Crunches", sets: 3, reps: "20", rest: "15 sec" },
      { name: "Leg Raises", sets: 3, reps: "15", rest: "15 sec" },
      { name: "Russian Twists", sets: 3, reps: "20", rest: "15 sec" },
      { name: "Bicycle Crunches", sets: 3, reps: "30 sec", rest: "15 sec" },
    ],
  },
  {
    id: "w3",
    name: "Full Body Strength",
    duration: 30,
    calories: 250,
    difficulty: "Intermediate",
    type: "Strength",
    exercises: [
      { name: "Push-ups", sets: 4, reps: "15", rest: "30 sec" },
      { name: "Squats", sets: 4, reps: "20", rest: "30 sec" },
      { name: "Lunges", sets: 3, reps: "12 each", rest: "30 sec" },
      { name: "Tricep Dips (chair)", sets: 3, reps: "12", rest: "30 sec" },
      { name: "Glute Bridges", sets: 3, reps: "20", rest: "20 sec" },
    ],
  },
  {
    id: "w4",
    name: "Evening Stretch & Cool Down",
    duration: 10,
    calories: 50,
    difficulty: "Beginner",
    type: "Flexibility",
    exercises: [
      { name: "Child's Pose", sets: 1, reps: "60 sec", rest: "0" },
      { name: "Hip Flexor Stretch", sets: 1, reps: "30 sec each", rest: "0" },
      { name: "Hamstring Stretch", sets: 1, reps: "30 sec each", rest: "0" },
      { name: "Shoulder Stretch", sets: 1, reps: "30 sec each", rest: "0" },
    ],
  },
];

export const HOME_WORKOUTS = [
  ...QUICK_WORKOUTS,
  ...PHASE1_WORKOUTS,
  ...PHASE2_WORKOUTS,
  ...PHASE3_WORKOUTS,
];

export const INITIAL_TASKS = [];

export const HABITS = [
  { id: "h1", name: "Sleep 7+ hours", icon: "🌙", target: 7, unit: "hours", category: "sleep" },
  { id: "h2", name: "Drink 8 glasses water", icon: "💧", target: 8, unit: "glasses", category: "hydration" },
  { id: "h3", name: "Walk 5000 steps", icon: "👟", target: 5000, unit: "steps", category: "activity" },
  { id: "h4", name: "Workout", icon: "💪", target: 1, unit: "session", category: "fitness" },
];

export const SCHEDULE = [
  { id: "s1", title: "University", startTime: "08:00", endTime: "14:00", type: "university", days: ["Mon", "Tue", "Wed", "Thu"], color: "blue" },
  { id: "s2", title: "Work Shift", startTime: "15:00", endTime: "21:00", type: "work", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], color: "orange" },
  { id: "s3", title: "Morning Workout", startTime: "06:00", endTime: "06:45", type: "fitness", days: ["Mon", "Wed", "Fri"], color: "green" },
  { id: "s4", title: "Evening Walk", startTime: "21:30", endTime: "22:00", type: "fitness", days: ["Tue", "Thu", "Sat"], color: "green" },
  { id: "s5", title: "Study / Revision", startTime: "14:30", endTime: "15:00", type: "university", days: ["Mon", "Tue", "Wed", "Thu"], color: "blue" },
];

export const WEEKLY_STATS = [
  { day: "Mon", prayers: 0, workout: 0, water: 0, tasks: 0, calories: 0 },
  { day: "Tue", prayers: 0, workout: 0, water: 0, tasks: 0, calories: 0 },
  { day: "Wed", prayers: 0, workout: 0, water: 0, tasks: 0, calories: 0 },
  { day: "Thu", prayers: 0, workout: 0, water: 0, tasks: 0, calories: 0 },
  { day: "Fri", prayers: 0, workout: 0, water: 0, tasks: 0, calories: 0 },
  { day: "Sat", prayers: 0, workout: 0, water: 0, tasks: 0, calories: 0 },
  { day: "Sun", prayers: 0, workout: 0, water: 0, tasks: 0, calories: 0 },
];

export const WEIGHT_LOG = [];

export const AI_SUGGESTIONS = [
  { type: "workout", icon: "💪", title: "Workout Tip", message: "It's 40°C outside — workout indoors before 7 AM or after 9 PM to avoid heat exhaustion." },
  { type: "hydration", icon: "💧", title: "Hydration Alert", message: "In extreme heat, aim for 3–4 liters of water. Add a pinch of salt to prevent electrolyte loss." },
  { type: "schedule", icon: "📅", title: "Schedule Tip", message: "Use your 14:30–15:00 gap between uni and work for a quick 20-min power nap or revision." },
  { type: "meal", icon: "🥗", title: "Meal Suggestion", message: "Try: Oats + banana for breakfast, lentil soup + salad for lunch, eggs + veggies for dinner. Budget-friendly & fat-loss focused." },
  { type: "motivation", icon: "🔥", title: "Stay Consistent", message: "You don't need a gym. 20 minutes of bodyweight HIIT burns more fat than 1 hour of slow cardio." },
  { type: "recovery", icon: "😴", title: "Recovery Reminder", message: "Sleep is when your body burns fat and repairs muscle. Aim for 7–8 hours even on busy days." },
];

export const CATEGORY_COLORS = {
  university: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", dot: "bg-blue-500" },
  work: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-400", dot: "bg-orange-500" },
  fitness: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", dot: "bg-green-500" },
  personal: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", dot: "bg-purple-500" },
};

export const PRIORITY_COLORS = {
  high: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-700 dark:text-red-400" },
  medium: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400" },
  low: { bg: "bg-gray-100 dark:bg-gray-800", text: "text-gray-600 dark:text-gray-400" },
};
