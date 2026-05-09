import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Fitness from "./pages/Fitness";
import Prayer from "./pages/Prayer";
import Habits from "./pages/Habits";
import Analytics from "./pages/Analytics";
import Schedule from "./pages/Schedule";
import AIAssistant from "./pages/AIAssistant";
import FoodAssistant from "./pages/FoodAssistant";
import Settings from "./pages/Settings";
import WorkoutSession from "./pages/WorkoutSession";
import Budget from "./pages/Budget";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Full-screen workout session (no layout) */}
          <Route path="/workout-session" element={<WorkoutSession />} />
          
          {/* Regular pages with layout */}
          <Route path="*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/fitness" element={<Fitness />} />
                <Route path="/prayer" element={<Prayer />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/ai" element={<AIAssistant />} />
                <Route path="/food" element={<FoodAssistant />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
