import React, { useState, useMemo } from 'react';

const CATEGORIES = [
  { label: 'Food', icon: '🍔', className: 'badge-food' },
  { label: 'Travel', icon: '✈️', className: 'badge-travel' },
  { label: 'Shopping', icon: '🛍️', className: 'badge-shopping' },
  { label: 'Bills', icon: '🧾', className: 'badge-bills' },
  { label: 'Other', icon: '📦', className: 'badge-other' }
];

export default function App() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: 'Mobile',
      amount: 40000.0,
      category: 'Shopping',
      date: '2026-07-07'
    }
  ]);

  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: ''
  });

  const [searchTitle, setSearchTitle] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount || !form.date) return;

    const newExpense = {
      id: Date.now(),
      title: form.title.trim(),
      amount: parseFloat(form.amount) || 0,
      category: form.category,
      date: form.date
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setForm({ title: '', amount: '', category: 'Food', date: '' });
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((item) => {
      const matchesTitle = item.title.toLowerCase().includes(searchTitle.toLowerCase());
      const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
      return matchesTitle && matchesCategory;
    });
  }, [expenses, searchTitle, filterCategory]);

  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [expenses]);

  const getCategoryMeta = (catName) => {
    return CATEGORIES.find((c) => c.label === catName) || {
      label: catName,
      icon: '🏷️',
      className: 'badge-other'
    };
  };

  return (
    <div className="container">
      <header className="header">
        <h1>
          <span>💰</span> Expense Tracker
        </h1>
        <p>Keep track of your daily spending, simply and clearly.</p>
      </header>

      <section className="summary-grid">
        <div className="summary-card">
          <div className="label">TOTAL EXPENSES</div>
          <div className="value green">₹{totalAmount.toFixed(2)}</div>
        </div>
        <div className="summary-card">
          <div className="label">TOTAL TRANSACTIONS</div>
          <div className="value dark">{expenses.length}</div>
        </div>
      </section>

      <main className="main-content">
        <section className="card">
          <h2>Add Expense</h2>
          <form onSubmit={handleAddExpense}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="e.g. Groceries"
                value={form.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount (₹)</label>
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="e.g. 500"
                value={form.amount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleInputChange}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.label} value={cat.label}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary">
              Add Expense
            </button>
          </form>
        </section>

        <section className="card">
          <div className="filter-bar">
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>

            <select
              className="category-filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="All">All</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.label} value={cat.label}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>CATEGORY</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((exp) => {
                    const meta = getCategoryMeta(exp.category);
                    return (
                      <tr key={exp.id}>
                        <td>{exp.title}</td>
                        <td>
                          <span className={`badge ${meta.className}`}>
                            <span>{meta.icon}</span>
                            <span>{meta.label}</span>
                          </span>
                        </td>
                        <td>{exp.date}</td>
                        <td>
                          <strong>₹{Number(exp.amount).toFixed(2)}</strong>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-state">
                      No expenses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
