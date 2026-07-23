# FocusFlow

> A calm, responsive daily-priority planner that helps students and busy professionals decide what deserves attention today.

**Live demo:** https://steveantonysomavarapu.github.io/focusflow/
**Demo video:** Student must add the recorded-demo URL before submission.

## Problem statement

To-do lists often become long, noisy backlogs. FocusFlow makes the next step clear by combining quick task capture, simple priority labels, category filtering, and visible daily progress in one focused interface.

## Features

- Add tasks with a category, priority, and timeframe.
- Mark tasks complete or reopen them; progress updates instantly.
- Edit an existing task or confirm before deleting it.
- Search tasks and filter by Work, Personal, or Planning.
- See live counts for today, completed tasks, and high-priority tasks.
- Persistent browser storage, responsive layout, keyboard-visible focus states, and helpful loading, empty, and validation states.

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

## Verification

The app has been production-built successfully to a clean temporary output directory. If a normal `npm run build` fails while trying to replace `dist`, resolve the local directory permissions/ownership first; that is an environment issue, not a reason to submit an unverified build.

## Screenshots

Add real screenshots after recording your demo. Do not submit this table with placeholders:

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
- Browser storage is validated on load; corrupt or unexpected saved data falls back to the sample task list.

## Deployment

This Vite app can be deployed to Vercel or Netlify with the build command `npm run build` and publish directory `dist`.

## Student submission checklist

- Replace the live demo, video, and screenshot placeholders with real, viewable evidence.
- Push the source (not `node_modules` or `dist`) to a public GitHub repository.
- Test the deployed app on desktop and a narrow mobile screen before recording.
