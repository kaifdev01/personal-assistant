# 🚀 LifeAssist - Personal Life Assistant Web App

A modern, responsive productivity + fitness + spiritual life management application built with React JS, optimized for busy student-worker lifestyle.

## ✨ Features

### 📊 Dashboard
- Daily overview with motivational quotes
- Prayer status (5 daily prayers)
- Workout status & calories burned
- Water intake tracker
- Task completion score
- Daily streaks (prayer, workout, water, tasks)
- Quick actions for all activities

### 🕌 Prayer Management
- 5 daily prayer checklist with times
- Prayer streak tracking (12+ days)
- Quran reading tracker (pages/day)
- Weekly prayer consistency stats
- Visual progress indicators

### 💪 Gym & Fitness Assistant
- **Live Workout Session Mode** (NEW!)
  - Step-by-step exercise guidance
  - Detailed instructions for each exercise
  - Target muscles & benefits display
  - Form tips to prevent injury
  - Auto rest timer between sets
  - Progress tracking (Exercise X/Y, Set X/Y)
  - Pause/Resume/Skip controls
  - Session completion summary
- 4 pre-built home workout routines (HIIT, Core, Strength, Flexibility)
- Workout & rest timers
- Weight logging & progress tracking
- Water intake tracker (8-16 glasses)
- Calorie estimator
- Heat advisory for 35-45°C weather

### ✅ Task Management
- Add/edit/delete tasks
- Priority levels (high, medium, low)
- Categories (university, work, fitness, personal)
- Due dates
- Productivity score calculation
- Filter by category
- Completion tracking

### 🎯 Habit Tracker
- 6 daily habits:
  - Sleep tracking (7+ hours)
  - Water intake (8 glasses)
  - Walking (5000 steps)
  - Workout consistency
  - Sugar reduction
  - Screen time goals
- Smart input controls per habit type
- Weekly consistency graphs
- Habit tips for your lifestyle

### 📈 Analytics
- Weekly overview charts (Recharts)
- Prayer consistency area chart
- Calories burned bar chart
- Water intake tracking
- Weight progress line chart
- Task completion trends
- Average calculations

### 📅 Schedule Planner
- Smart daily routine timeline
- University schedule (8 AM - 2 PM)
- Work schedule (3 PM - 9 PM)
- Heat-aware workout recommendations
- Best workout windows (6-7 AM, 9-10 PM)
- Weekly schedule view
- Day-by-day planner

### 🤖 AI Assistant
- Personalized workout suggestions
- 7-day home workout plan
- Budget-friendly meal plans (breakfast, lunch, dinner, snacks)
- Schedule optimization tips
- Hydration reminders
- Motivational coaching
- Heat & fatigue management

### ⚙️ Settings
- Dark/light mode toggle
- Daily goals customization
- Personal info (age, height, weight)
- Activity level settings
- Notification preferences
- Data export (JSON)
- Reset all data

## 🛠️ Tech Stack

- **React JS** (v18+)
- **React Router** (v6) - Navigation
- **Context API + useReducer** - State management
- **localStorage** - Data persistence
- **Tailwind CSS** - Styling
- **Recharts** - Analytics charts
- **Lucide React** - Icons
- **Functional components** - Modern React patterns
- **Custom hooks** - Reusable logic

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/index.js              # Reusable UI components
│   └── layout/Layout.js         # Sidebar + Header
├── context/
│   └── AppContext.js            # Global state management
├── hooks/
│   └── useStats.js              # Custom hooks
├── data/
│   ├── mockData.js              # Mock data
│   └── exerciseLibrary.js       # Exercise details (NEW!)
├── pages/
│   ├── Dashboard.js             # Main dashboard
│   ├── Prayer.js                # Prayer tracker
│   ├── Fitness.js               # Fitness hub
│   ├── WorkoutSession.js        # Live workout mode (NEW!)
│   ├── Tasks.js                 # Task manager
│   ├── Habits.js                # Habit tracker
│   ├── Analytics.js             # Charts & stats
│   ├── Schedule.js              # Daily planner
│   ├── AIAssistant.js           # AI suggestions
│   └── Settings.js              # App settings
├── App.js                       # Routes
└── index.js                     # Entry point
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. **Navigate to project folder:**
   ```bash
   cd "d:\Kaif\New folder (2)\life-assistant"
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

Output will be in `build/` folder.

## 🎨 UI Features

- **Glassmorphism cards** - Modern frosted glass effect
- **Dark/light mode** - Persisted preference
- **Mobile-first responsive** - Works on all devices
- **Smooth animations** - Fade-in, slide-in effects
- **Custom scrollbar** - Minimal design
- **Circular progress** - Visual timers
- **Progress bars** - Track completion
- **Badges** - Color-coded labels
- **Modal dialogs** - Clean overlays
- **Empty states** - Helpful placeholders

## 💾 Data Persistence

- All data stored in **localStorage**
- Survives page refresh
- Auto-resets daily fields at midnight
- Export/import functionality
- No backend required

## 🎯 Optimized For

- **University students** (8 AM - 2 PM schedule)
- **Part-time workers** (3 PM - 9 PM shift)
- **Home workouts** (no gym access)
- **Budget-conscious** (free exercises, cheap meals)
- **Hot climate** (35-45°C heat advisories)
- **Fat loss goals** (calorie tracking, HIIT workouts)
- **Spiritual practice** (5 daily prayers, Quran reading)

## 🔥 New Workout Session Features

### Exercise Library
- **20+ exercises** with detailed info:
  - Step-by-step instructions
  - Target muscles (chest, core, legs, etc.)
  - Benefits (fat burn, strength, endurance)
  - Form tips (prevent injury)
  - Difficulty level
  - Calories per minute

### Live Session Mode
- Full-screen immersive experience
- Auto-advance through exercises
- Rest timer between sets
- Visual progress tracking
- Pause/Resume/Skip controls
- Session completion summary
- Calories burned calculation

## 🌟 Future Improvements

- [ ] Add custom workout builder
- [ ] Integrate prayer time API (location-based)
- [ ] Add workout video demonstrations
- [ ] Social sharing (share progress)
- [ ] Habit streak calendar view
- [ ] Meal calorie calculator
- [ ] Voice commands for workout
- [ ] Progressive Web App (PWA)
- [ ] Cloud sync (Firebase/Supabase)
- [ ] Weekly/monthly reports
- [ ] Achievement badges
- [ ] Friend challenges

## 📝 Notes

- **No account required** - All data stored locally
- **Privacy-first** - No data sent to servers
- **Offline-capable** - Works without internet
- **Zero dependencies on external APIs** - Fully self-contained

## 🐛 Known Issues

- None currently! 🎉

## 📄 License

MIT License - Free to use and modify

## 👨‍💻 Developer

Built with ❤️ for Kaif's busy student-worker lifestyle.

---

**Start your journey to discipline, consistency, and productivity today! 💪📚**
