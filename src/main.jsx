import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const seed = [
  { id: '1', title: 'Review sprint goals', category: 'Work', priority: 'High', due: 'Today', done: false },
  { id: '2', title: 'Take a 20-minute walk', category: 'Personal', priority: 'Medium', due: 'Today', done: false },
  { id: '3', title: 'Plan tomorrow’s top three', category: 'Planning', priority: 'Low', due: 'Tomorrow', done: true }
];
const categories = ['All', 'Work', 'Personal', 'Planning'];
const priorities = ['High', 'Medium', 'Low'];

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState({ title: '', category: 'Work', priority: 'Medium', due: 'Today' });
  const [error, setError] = useState('');

  useEffect(() => {
    try { setTasks(JSON.parse(localStorage.getItem('focusflow-tasks')) || seed); }
    catch { setTasks(seed); }
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => { if (!loading) localStorage.setItem('focusflow-tasks', JSON.stringify(tasks)); }, [tasks, loading]);

  const visible = useMemo(() => tasks.filter(t =>
    (filter === 'All' || t.category === filter) && t.title.toLowerCase().includes(query.toLowerCase())
  ), [tasks, filter, query]);
  const completed = tasks.filter(t => t.done).length;
  const today = tasks.filter(t => t.due === 'Today' && !t.done).length;

  function addTask(e) {
    e.preventDefault();
    if (!form.title.trim()) { setError('Add a task title to continue.'); return; }
    setTasks([{ ...form, title: form.title.trim(), id: crypto.randomUUID(), done: false }, ...tasks]);
    setForm({ ...form, title: '' }); setError('');
  }
  function toggle(id) { setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)); }
  function remove(id) { setTasks(tasks.filter(t => t.id !== id)); }

  return <main className="app-shell">
    <header><div><p className="eyebrow">YOUR DAY, WITH INTENTION</p><h1>Focus<span>Flow</span></h1></div><div className="date">☀︎ <strong>Today</strong><small>Make meaningful progress</small></div></header>
    <section className="hero"><div><p className="eyebrow">DAILY PRIORITY PLANNER</p><h2>Less noise. More <em>done.</em></h2><p>Capture what matters, choose your next move, and keep momentum visible.</p></div><div className="progress"><span>{tasks.length ? Math.round(completed / tasks.length * 100) : 0}%</span><small>of tasks completed</small><div className="bar"><i style={{ width: `${tasks.length ? completed / tasks.length * 100 : 0}%` }} /></div></div></section>
    <section className="stats"><article><span>✦</span><div><b>{today}</b><small>Tasks for today</small></div></article><article><span>✓</span><div><b>{completed}</b><small>Completed</small></div></article><article><span>◎</span><div><b>{tasks.filter(t => t.priority === 'High' && !t.done).length}</b><small>High priority</small></div></article></section>
    <section className="workspace"><div className="panel add-panel"><h3>Add a task</h3><form onSubmit={addTask}><label>What needs your attention?<input value={form.title} onChange={e => setForm({...form, title:e.target.value})} placeholder="e.g. Send project update" /></label><div className="fields"><label>Category<select value={form.category} onChange={e => setForm({...form, category:e.target.value})}>{categories.slice(1).map(c => <option key={c}>{c}</option>)}</select></label><label>Priority<select value={form.priority} onChange={e => setForm({...form, priority:e.target.value})}>{priorities.map(p => <option key={p}>{p}</option>)}</select></label></div><label>When<select value={form.due} onChange={e => setForm({...form, due:e.target.value})}><option>Today</option><option>Tomorrow</option><option>This week</option></select></label>{error && <p className="error" role="alert">{error}</p>}<button type="submit">Add to my list <span>→</span></button></form></div>
      <div className="panel list-panel"><div className="list-top"><div><h3>Your focus list</h3><p>{visible.length} task{visible.length === 1 ? '' : 's'} shown</p></div><input className="search" aria-label="Search tasks" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" /></div><nav>{categories.map(c => <button className={filter === c ? 'active' : ''} onClick={() => setFilter(c)} key={c}>{c}</button>)}</nav>{loading ? <div className="state"><i className="spinner" />Loading your focus list…</div> : visible.length === 0 ? <div className="state"><b>Nothing here yet.</b><br/>Try another filter or add a task.</div> : <ul>{visible.map(t => <li key={t.id} className={t.done ? 'done' : ''}><button className="check" onClick={() => toggle(t.id)} aria-label={`Mark ${t.title} ${t.done ? 'incomplete' : 'complete'}`}>{t.done ? '✓' : ''}</button><div><b>{t.title}</b><p><span className={`tag ${t.priority.toLowerCase()}`}>{t.priority}</span>{t.category} · {t.due}</p></div><button className="delete" onClick={() => remove(t.id)} aria-label={`Delete ${t.title}`}>×</button></li>)}</ul>}</div></section>
    <footer>FocusFlow · A calmer way to plan the work that matters.</footer>
  </main>;
}
createRoot(document.getElementById('root')).render(<App />);
