# FocusFlow — 3–5 minute recorded demo

## Opening (0:00–0:30)

“Hi, I’m [name]. This is FocusFlow, a daily-priority planner for people whose normal to-do list has become overwhelming. Instead of showing a giant backlog, it helps you capture work, see what matters today, and track momentum.”

## Product walkthrough (0:30–2:25)

“The top of the dashboard gives a quick view of my day: tasks still due today, completed work, and high-priority items. The completion percentage changes as I work through my list.”

“I’ll add a real task now. I enter ‘Prepare capstone demo’, set the category to Work, priority to High, and choose Today. When I add it, it appears immediately in the focus list and the high-priority count updates.”

“I can filter by category when I want a cleaner view, or search by a word when my list grows. Each task has a clear priority tag and timeframe.”

“When I finish a task, I mark it complete. It stays visible as a record, but is visually de-emphasized and the completion meter updates. If I add a blank task, the app gives a helpful validation message. When a filter has no matches, there is also a friendly empty state rather than a broken-looking screen.”

## Implementation (2:25–3:35)

“FocusFlow is built with React and Vite. The interface is organized as a small single-page application: state and interaction logic live in `src/main.jsx`, and the visual system and responsive layout live in `src/styles.css`.”

“For this scoped version, I used browser local storage rather than a backend. That means tasks persist after refresh without requiring accounts or server infrastructure. I also added an initial loading treatment so the data handoff feels intentional.”

“The layout adapts from a two-column desktop workspace to a single-column mobile experience, which makes the core flow usable on smaller screens.”

## Challenge and close (3:35–4:10)

“The main design challenge was keeping task management powerful enough to be useful without turning it into another complicated project-management tool. I resolved that by limiting each task to the fields needed for a daily decision: category, priority, and timeframe.”

“Next, I would add optional sign-in and a cloud database so lists can sync across devices. Thank you for watching FocusFlow.”

