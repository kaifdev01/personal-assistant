import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Card, Badge, Modal, EmptyState } from "../components/ui";
import { useTaskStats } from "../hooks/useStats";
import { CATEGORY_COLORS, PRIORITY_COLORS } from "../data/mockData";
import { Plus, Trash2, Edit2, CheckCircle, Circle, Filter } from "lucide-react";

const EMPTY_TASK = { title: "", category: "personal", priority: "medium", dueDate: new Date().toISOString().split("T")[0] };

export default function Tasks() {
  const { state, dispatch } = useApp();
  const { completed, total, score } = useTaskStats();
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [form, setForm] = useState(EMPTY_TASK);
  const [filter, setFilter] = useState("all");
  const [errors, setErrors] = useState({});

  function openAdd() { setForm(EMPTY_TASK); setEditTask(null); setErrors({}); setShowModal(true); }
  function openEdit(task) { setForm({ title: task.title, category: task.category, priority: task.priority, dueDate: task.dueDate }); setEditTask(task); setErrors({}); setShowModal(true); }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.dueDate) e.dueDate = "Due date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    if (editTask) {
      dispatch({ type: "UPDATE_TASK", task: { ...editTask, ...form } });
    } else {
      dispatch({ type: "ADD_TASK", task: { ...form, id: `t${Date.now()}`, completed: false } });
    }
    setShowModal(false);
  }

  const categories = ["all", "university", "work", "fitness", "personal"];
  const filtered = state.tasks.filter(t => filter === "all" || t.category === filter);
  const pending = filtered.filter(t => !t.completed);
  const done = filtered.filter(t => t.completed);

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Task Manager</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{completed}/{total} completed today · Score: {score}%</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Task
        </button>
      </div>

      {/* Productivity Score */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total", value: state.tasks.length, color: "text-gray-700 dark:text-gray-300" },
          { label: "Done", value: state.tasks.filter(t => t.completed).length, color: "text-green-600" },
          { label: "Pending", value: state.tasks.filter(t => !t.completed).length, color: "text-orange-500" },
          { label: "Score", value: `${score}%`, color: "text-violet-600" },
        ].map(s => (
          <div key={s.label} className="card text-center py-3">
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Filter size={16} className="text-gray-400 flex-shrink-0 mt-1" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-all ${
              filter === cat ? "bg-violet-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pending Tasks */}
      <Card>
        <h3 className="font-semibold mb-3">Pending ({pending.length})</h3>
        {pending.length === 0 ? (
          <EmptyState icon="✅" title="All done!" description="No pending tasks. Add a new one." action={<button onClick={openAdd} className="btn-primary text-sm">+ Add Task</button>} />
        ) : (
          <div className="space-y-2">
            {pending.map(task => <TaskItem key={task.id} task={task} onEdit={openEdit} dispatch={dispatch} />)}
          </div>
        )}
      </Card>

      {/* Completed Tasks */}
      {done.length > 0 && (
        <Card>
          <h3 className="font-semibold mb-3 text-gray-400">Completed ({done.length})</h3>
          <div className="space-y-2">
            {done.map(task => <TaskItem key={task.id} task={task} onEdit={openEdit} dispatch={dispatch} />)}
          </div>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title={editTask ? "Edit Task" : "Add Task"}>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Title *</label>
            <input className="input" placeholder="Task title..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-1 block">Category</label>
              <select className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {["university", "work", "fitness", "personal"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Priority</label>
              <select className="input" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                {["high", "medium", "low"].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Due Date *</label>
            <input type="date" className="input" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
            {errors.dueDate && <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowModal(false)} className="btn-secondary flex-1">Cancel</button>
            <button onClick={handleSave} className="btn-primary flex-1">{editTask ? "Update" : "Add Task"}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function TaskItem({ task, onEdit, dispatch }) {
  const catColor = CATEGORY_COLORS[task.category] || CATEGORY_COLORS.personal;
  const priColor = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.low;
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${task.completed ? "opacity-60 bg-gray-50 dark:bg-gray-800/50 border-transparent" : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-violet-200 dark:hover:border-violet-700"}`}>
      <button onClick={() => dispatch({ type: "TOGGLE_TASK", id: task.id })} className="flex-shrink-0 text-gray-400 hover:text-green-500 transition-colors">
        {task.completed ? <CheckCircle size={20} className="text-green-500" /> : <Circle size={20} />}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${task.completed ? "line-through text-gray-400" : ""}`}>{task.title}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className={`badge ${catColor.bg} ${catColor.text}`}>{task.category}</span>
          <span className={`badge ${priColor.bg} ${priColor.text}`}>{task.priority}</span>
          <span className="text-xs text-gray-400">{task.dueDate}</span>
        </div>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <button onClick={() => onEdit(task)} className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-blue-500 transition-colors">
          <Edit2 size={13} />
        </button>
        <button onClick={() => dispatch({ type: "DELETE_TASK", id: task.id })} className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}
