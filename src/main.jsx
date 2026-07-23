import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const seed = [
  { id: '1', title: 'Review sprint goals', category: 'Work', priority: 'High', due: 'Today', done: false },
  { id: '2', title: 'Take a 20-minute walk', category: 'Personal', priority: 'Medium', due: 'Today', done: false },
  { id: '3', title: 'Plan tomorrow’s top three', category: 'Planning', priority: 'Low', due: 'Tomorrow', done: true }
];
const categories = ['All', 'Work', 'Personal', 'Planning'];
const priorities = ['High', 'Medium', 'Low'];
const emptyForm = { title: '', category: 'Work', priority: 'Medium', due: 'Today' };

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem('focusflow-tasks'));
    if (!Array.isArray(saved) || !saved.every(task => task
      && typeof task.id === 'string'
      && typeof task.title === 'string'
      && categories.includes(task.category)
      && priorities.includes(task.priority)
      && ['Today', 'Tomorrow', 'This week'].includes(task.due)
      && typeof task.done === 'boolean')) return seed;
    return saved;
  } catch { return seed; }
}

function newTaskId() {
  return typeof globalThis.crypto?.randomUUID === 'function' ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const titleInput = useRef(null);

  useEffect(() => {
    setTasks(loadTasks());
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!loading) {
      try { localStorage.setItem('focusflow-tasks', JSON.stringify(tasks)); }
      catch { setError('Your browser could not save tasks locally.'); }
    }
  }, [tasks, loading]);

  const visible = useMemo(() => tasks.filter(task =>
    (filter === 'All' || task.category === filter) && task.title.toLowerCase().includes(query.toLowerCase())
  ), [tasks, filter, query]);
  const completed = tasks.filter(task => task.done).length;
  const today = tasks.filter(task => task.due === 'Today' && !task.done).length;

  function submitTask(event) {
    event.preventDefault();
    if (!form.title.trim()) { setError('Add a task title to continue.'); return; }
    if (editingId) {
      setTasks(tasks.map(task => task.id === editingId ? { ...task, ...form, title: form.title.trim() } : task));
      setEditingId(null);
    } else {
      setTasks([{ ...form, title: form.title.trim(), id: newTaskId(), done: false }, ...tasks]);
    }
    setForm(emptyForm);
    setError('');
    requestAnimationFrame(() => titleInput.current?.focus());
  }

  function toggle(id) { setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task)); }
  function remove(id) {
    const task = tasks.find(candidate => candidate.id === id);
    if (task && window.confirm(`Delete “${task.title}”? This cannot be undone.`)) setTasks(tasks.filter(candidate => candidate.id !== id));
  }
  function startEdit(task) {
    setForm({ title: task.title, category: task.category, priority: task.priority, due: task.due });
    setEditingId(task.id);
    setError('');
    requestAnimationFrame(() => titleInput.current?.focus());
  }
  function cancelEdit() { setForm(emptyForm); setEditingId(null); setError(''); }

  return <main className="app-shell">
    <header><div><h1>Focus<span>Flow</span></h1></div><div className="date">☀︎ <strong>Today</strong></div></header>
    <section className="hero"><div className="progress"><span>{tasks.length ? Math.round(completed / tasks.length * 100) : 0}%</span><small>of tasks completed</small><div className="bar"><i style={{ width: `${tasks.length ? completed / tasks.length * 100 : 0}%` }} /></div></div></section>
    <section className="stats" aria-label="Task statistics"><article><span>✦</span><div><b>{today}</b><small>Tasks for today</small></div></article><article><span>✓</span><div><b>{completed}</b><small>Completed</small></div></article><article><span>◎</span><div><b>{tasks.filter(task => task.priority === 'High' && !task.done).length}</b><small>High priority</small></div></article></section>
    <section className="workspace"><div className="panel add-panel"><h3>{editingId ? 'Edit task' : 'Add a task'}</h3><form onSubmit={submitTask}><label>What needs your attention?<input ref={titleInput} value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder="e.g. Send project update" aria-describedby={error ? 'task-error' : undefined} /></label><div className="fields"><label>Category<select value={form.category} onChange={event => setForm({ ...form, category: event.target.value })}>{categories.slice(1).map(category => <option key={category}>{category}</option>)}</select></label><label>Priority<select value={form.priority} onChange={event => setForm({ ...form, priority: event.target.value })}>{priorities.map(priority => <option key={priority}>{priority}</option>)}</select></label></div><label>When<select value={form.due} onChange={event => setForm({ ...form, due: event.target.value })}><option>Today</option><option>Tomorrow</option><option>This week</option></select></label>{error && <p className="error" id="task-error" role="alert">{error}</p>}<div className="form-actions"><button type="submit">{editingId ? 'Save changes' : 'Add to my list'} <span>→</span></button>{editingId && <button type="button" className="secondary" onClick={cancelEdit}>Cancel</button>}</div></form></div>
      <div className="panel list-panel"><div className="list-top"><div><h3>Your focus list</h3><p>{visible.length} task{visible.length === 1 ? '' : 's'} shown</p></div><input className="search" type="search" aria-label="Search tasks" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search" /></div><nav aria-label="Filter tasks by category">{categories.map(category => <button type="button" aria-pressed={filter === category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>)}</nav>{loading ? <div className="state" role="status"><i className="spinner" />Loading your focus list…</div> : visible.length === 0 ? <div className="state"><b>Nothing here yet.</b><br />Try another filter or add a task.</div> : <ul>{visible.map(task => <li key={task.id} className={task.done ? 'done' : ''}><button type="button" className="check" onClick={() => toggle(task.id)} aria-label={`Mark ${task.title} ${task.done ? 'incomplete' : 'complete'}`}>{task.done ? '✓' : ''}</button><div><b>{task.title}</b><p><span className={`tag ${task.priority.toLowerCase()}`}>{task.priority}</span>{task.category} · {task.due}</p></div><button type="button" className="edit" onClick={() => startEdit(task)} aria-label={`Edit ${task.title}`}>Edit</button><button type="button" className="delete" onClick={() => remove(task.id)} aria-label={`Delete ${task.title}`}>×</button></li>)}</ul>}</div></section>
    <footer>FocusFlow · A calmer way to plan the work that matters.</footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);
