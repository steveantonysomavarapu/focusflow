# FocusFlow

> A calm, responsive daily-priority planner that helps students and busy professionals decide what deserves attention today.

**Live demo:** _Add deployed link here_  
**Demo video:** _Add video link here_

## Problem statement

To-do lists often become long, noisy backlogs. FocusFlow makes the next step clear by combining quick task capture, simple priority labels, category filtering, and visible daily progress in one focused interface.

## Features

- Add tasks with a category, priority, and timeframe.
- Mark tasks complete or reopen them; progress updates instantly.
- Search tasks and filter by Work, Personal, or Planning.
- See live counts for today, completed tasks, and high-priority tasks.
- Persistent browser storage, responsive layout, and helpful loading, empty, and validation states.

## Tech stack

- React + Vite
- Plain CSS with responsive breakpoints
- Browser `localStorage` for lightweight persistence

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal. For a production check:

```bash
npm run build
npm run preview
```

## Screenshots

Add screenshots after recording your demo:

| Desktop dashboard | Mobile layout |
| --- | --- |
| _Add screenshot_ | _Add screenshot_ |

## Project structure

```text
focusflow/
├── src/
│   ├── main.jsx       # UI, task interactions, and local persistence
│   └── styles.css     # responsive visual system
├── index.html
├── package.json
├── DEMO_SCRIPT.md
└── SUBMISSION_CHECKLIST.md
```

## Known limitations

- Tasks are stored in the current browser only; there is no account or shared cloud database.
- Dates are intentionally simple timeframes (Today, Tomorrow, This week) to keep planning friction low.

## Deployment

This Vite app can be deployed to Vercel or Netlify with the build command `npm run build` and publish directory `dist`.

