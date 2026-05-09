import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { Card, Badge, ProgressBar, Modal } from "../components/ui";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Wallet, Plus, Trash2, TrendingUp, TrendingDown, Target, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

const EXPENSE_CATEGORIES = ["Food", "Transport", "University", "Shopping", "Health", "Entertainment", "Rent", "Other"];
const INCOME_CATEGORIES = ["Salary", "Freelance", "Family", "Other"];
const CATEGORY_COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f97316", "#ef4444", "#f59e0b", "#3b82f6", "#6b7280"];

const tooltipStyle = { backgroundColor: "#1f2937", border: "none", borderRadius: "12px", color: "#f9fafb", fontSize: "12px" };

export default function Budget() {
  const { state, dispatch } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7)); // "2025-01"
  const [form, setForm] = useState({ title: "", amount: "", type: "expense", category: "Food", customCategory: "", date: new Date().toISOString().split("T")[0] });
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetInput, setBudgetInput] = useState(Number(state.monthlyBudget) || 15000);

  const transactions = useMemo(() =>
    Array.isArray(state.budgetTransactions)
      ? state.budgetTransactions.filter(t => t && typeof t === "object" && t.id)
      : [],
  [state.budgetTransactions]);
  const monthlyBudget = Number(state.monthlyBudget) || 15000;

  // Filter by selected month
  const monthTransactions = useMemo(() =>
    transactions.filter(t => t.date.startsWith(filterMonth)),
    [transactions, filterMonth]
  );

  const totalIncome = monthlyBudget + monthTransactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = monthTransactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const budgetUsed = Math.round((totalExpenses / monthlyBudget) * 100);

  // Group expenses by category for pie chart
  const categoryData = useMemo(() => {
    const map = {};
    monthTransactions.filter(t => t.type === "expense").forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [monthTransactions]);

  // Last 6 months bar chart
  const monthlyChartData = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = d.toISOString().slice(0, 7);
      const label = d.toLocaleString("default", { month: "short" });
      const txns = transactions.filter(t => t.date.startsWith(key));
      months.push({
        month: label,
        income: txns.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0),
        expenses: txns.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0),
      });
    }
    return months;
  }, [transactions]);

  function addTransaction() {
    if (!form.title || !form.amount) return;
    const finalCategory = form.category === "Other" && form.customCategory.trim()
      ? form.customCategory.trim()
      : form.category;
    dispatch({
      type: "ADD_TRANSACTION",
      transaction: {
        id: `tx${Date.now()}`,
        title: form.title,
        amount: parseFloat(form.amount),
        type: form.type,
        category: finalCategory,
        date: form.date,
      },
    });
    setForm({ title: "", amount: "", type: "expense", category: "Food", customCategory: "", date: new Date().toISOString().split("T")[0] });
    setShowModal(false);
  }

  function saveBudget() {
    dispatch({ type: "SET_MONTHLY_BUDGET", value: parseFloat(budgetInput) || 15000 });
    setShowBudgetModal(false);
  }

  const TABS = ["overview", "transactions", "charts"];

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="card bg-gradient-to-br from-emerald-600 to-teal-700 text-white border-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2"><Wallet size={20} /> Budget Tracker</h2>
            <p className="text-emerald-200 text-sm mt-1">Track income, expenses & savings</p>
            <div className="flex gap-4 mt-3">
              <div>
                <div className="font-bold text-lg">PKR {totalIncome.toLocaleString()}</div>
                <div className="text-xs text-emerald-200">Total Income</div>
              </div>
              <div className="w-px bg-emerald-500" />
              <div>
                <div className="font-bold text-lg">PKR {totalExpenses.toLocaleString()}</div>
                <div className="text-xs text-emerald-200">Expenses</div>
              </div>
              <div className="w-px bg-emerald-500" />
              <div>
                <div className={`font-bold text-lg ${balance >= 0 ? "text-white" : "text-red-300"}`}>PKR {balance.toLocaleString()}</div>
                <div className="text-xs text-emerald-200">Balance</div>
              </div>
            </div>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-white text-emerald-600 px-3 py-2 rounded-xl font-semibold text-sm hover:bg-emerald-50 transition-colors flex items-center gap-1">
            <Plus size={15} /> Add
          </button>
        </div>
      </div>

      {/* Budget Progress */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm flex items-center gap-2"><Target size={15} className="text-emerald-500" /> Monthly Budget</h3>
          <button onClick={() => { setBudgetInput(monthlyBudget); setShowBudgetModal(true); }} className="text-xs text-violet-600 dark:text-violet-400 hover:underline">
            Edit
          </button>
        </div>
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-500">PKR {totalExpenses.toLocaleString()} spent</span>
          <Badge color={budgetUsed > 100 ? "red" : budgetUsed > 80 ? "orange" : "green"}>
            {budgetUsed}% used
          </Badge>
        </div>
        <ProgressBar value={totalExpenses} max={monthlyBudget} color={budgetUsed > 100 ? "red" : budgetUsed > 80 ? "orange" : "green"} size="lg" />
        <p className="text-xs text-gray-400 mt-2">Budget: PKR {monthlyBudget.toLocaleString()} / month</p>
      </Card>

      {/* Month filter + Tabs */}
      <div className="flex items-center gap-3">
        <input
          type="month"
          value={filterMonth}
          onChange={e => setFilterMonth(e.target.value)}
          className="input text-sm py-1.5 w-40"
        />
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl flex-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${activeTab === tab ? "bg-white dark:bg-gray-900 shadow-sm text-violet-600 dark:text-violet-400" : "text-gray-500 dark:text-gray-400"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="card text-center">
              <ArrowUpCircle size={20} className="text-green-500 mx-auto mb-1" />
              <div className="font-bold text-green-600">PKR {totalIncome.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Income</div>
            </div>
            <div className="card text-center">
              <ArrowDownCircle size={20} className="text-red-500 mx-auto mb-1" />
              <div className="font-bold text-red-500">PKR {totalExpenses.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Expenses</div>
            </div>
            <div className="card text-center">
              <Wallet size={20} className={`mx-auto mb-1 ${balance >= 0 ? "text-emerald-500" : "text-red-500"}`} />
              <div className={`font-bold ${balance >= 0 ? "text-emerald-600" : "text-red-500"}`}>PKR {Math.abs(balance).toLocaleString()}</div>
              <div className="text-xs text-gray-400">{balance >= 0 ? "Saved" : "Deficit"}</div>
            </div>
          </div>

          {/* Category breakdown */}
          {categoryData.length > 0 ? (
            <Card>
              <h3 className="font-semibold text-sm mb-4">Expense Breakdown</h3>
              <div className="flex items-center gap-4">
                <PieChart width={130} height={130}>
                  <Pie data={categoryData} cx={60} cy={60} innerRadius={35} outerRadius={60} dataKey="value" paddingAngle={3}>
                    {categoryData.map((_, i) => <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={v => `PKR ${v.toLocaleString()}`} />
                </PieChart>
                <div className="flex-1 space-y-2">
                  {categoryData.map((item, i) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }} />
                        <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                      </div>
                      <span className="font-medium">PKR {item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-8 text-gray-400">
                <Wallet size={36} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No transactions this month</p>
                <button onClick={() => setShowModal(true)} className="btn-primary mt-3 text-sm">+ Add Transaction</button>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <div className="space-y-2">
          {monthTransactions.length === 0 ? (
            <Card>
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No transactions for this month</p>
                <button onClick={() => setShowModal(true)} className="btn-primary mt-3 text-sm">+ Add Transaction</button>
              </div>
            </Card>
          ) : (
            [...monthTransactions].sort((a, b) => b.date.localeCompare(a.date)).map(t => (
              <div key={t.id} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${t.type === "income" ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}>
                  {t.type === "income" ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-red-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{t.title}</div>
                  <div className="text-xs text-gray-400">{t.category} · {t.date}</div>
                </div>
                <div className={`font-bold text-sm ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>
                  {t.type === "income" ? "+" : "-"}PKR {t.amount.toLocaleString()}
                </div>
                <button onClick={() => dispatch({ type: "DELETE_TRANSACTION", id: t.id })} className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Charts Tab */}
      {activeTab === "charts" && (
        <Card>
          <h3 className="font-semibold text-sm mb-4">Last 6 Months</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyChartData} barSize={14} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={v => `PKR ${v.toLocaleString()}`} />
              <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
              <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Add Transaction Modal */}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Add Transaction">
        <div className="space-y-3">
          {/* Type toggle */}
          <div className="grid grid-cols-2 gap-2">
            {["expense", "income"].map(type => (
              <button
                key={type}
                onClick={() => setForm({ ...form, type, category: type === "expense" ? "Food" : "Salary" })}
                className={`py-2 rounded-xl text-sm font-medium capitalize transition-all ${form.type === type ? (type === "expense" ? "bg-red-500 text-white" : "bg-green-500 text-white") : "bg-gray-100 dark:bg-gray-800 text-gray-500"}`}
              >
                {type === "expense" ? "💸 Expense" : "💰 Income"}
              </button>
            ))}
          </div>
          <input type="text" className="input" placeholder="Title (e.g. Lunch, Salary)" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input type="number" className="input" placeholder="Amount in PKR" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
          <select className="input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value, customCategory: "" })}>
            {(form.type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {form.category === "Other" && (
            <input
              type="text"
              className="input"
              placeholder="Enter your category (e.g. Gym, Books)"
              value={form.customCategory}
              onChange={e => setForm({ ...form, customCategory: e.target.value })}
            />
          )}
          <input type="date" className="input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
          <button onClick={addTransaction} disabled={!form.title || !form.amount} className="btn-primary w-full disabled:opacity-50">
            Add {form.type === "expense" ? "Expense" : "Income"}
          </button>
        </div>
      </Modal>

      {/* Edit Budget Modal */}
      <Modal open={showBudgetModal} onClose={() => setShowBudgetModal(false)} title="Set Monthly Budget">
        <input type="number" className="input mb-4" placeholder="Monthly budget in PKR" value={budgetInput} onChange={e => setBudgetInput(e.target.value)} />
        <button onClick={saveBudget} className="btn-primary w-full">Save Budget</button>
      </Modal>
    </div>
  );
}
