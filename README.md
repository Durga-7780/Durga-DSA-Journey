# DSA Lab — Learn DSA by Seeing How It Works

An interactive, visual Data Structures & Algorithms roadmap. Static React app, no backend, no auth, no code execution — just visual explanations, step-by-step animations, and Python reference syntax.

## Stack

- React 19 + Vite
- React Router (`HashRouter`, so it works on GitHub Pages / any static host with zero server config)
- Framer Motion for animation
- Plain CSS (design tokens in `src/theme.css`) — no UI framework

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # preview the production build locally
```

## Deploy to GitHub Pages

This repo already includes `.github/workflows/deploy.yml`, which builds and deploys `dist/` to GitHub Pages automatically on every push to `main`.

One-time setup after you push this repo to GitHub:

1. Push this project to a new GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or run the workflow manually from the **Actions** tab). The site will be live at `https://<username>.github.io/<repo-name>/` a minute or two later.

No repo-name configuration is needed in the code — `vite.config.js` uses `base: './'` (relative asset paths) and the router uses `HashRouter`, so the build works unmodified at any subpath.

### Deploying elsewhere (Vercel / Netlify)

Also works as-is:
- **Build command:** `npm run build`
- **Output directory:** `dist`

## Project structure

```
src/
  data/
    roadmap.js      # the 26-stage roadmap graph (ids, prerequisites, layout)
    topics.js        # full lesson content for each "ready" topic
    patterns.js       # pattern-recognition cards + the decision tree
  visualizations/    # one component per interactive visualization
  components/         # Sidebar, Layout, VizControls (play/pause/step/reset)
  hooks/               # useSteps (animation playback), useProgress (localStorage)
  pages/                # Home, Roadmap, TopicPage, Patterns, DecisionTree
```

## Adding a new topic

The roadmap already lists all 26 stages (`src/data/roadmap.js`). Topics without full content
show a "coming soon" page automatically. To finish one:

1. Add an entry to `src/data/topics.js` with the same shape as the existing topics (`whatIsIt`,
   `whyNeeded`, `howItWorks`, `pythonCode`, `complexity`, `whenToUse`, `interviewTips`,
   `commonMistakes`, `related`, and optionally `viz` naming a component from
   `src/visualizations/index.jsx`).
2. Flip `ready: true` for that id in `src/data/roadmap.js`.
3. (Optional) Build a new visualization component and register it in `src/visualizations/index.jsx`.

No other UI code needs to change — the topic page, sidebar, and roadmap all read from this data.

## Scope note

The original brief called for full Three.js/WebGL 3D scenes throughout. This build uses SVG +
Framer Motion / CSS animation instead — same "watch the algorithm run" experience, without the
bundle-size and mobile-GPU risk that a full 3D scene per topic brings to a static deploy. 14 of
the 26 roadmap stages have complete lessons and visualizations; the rest are stubbed with the
same data-driven architecture so they're straightforward to fill in later.
