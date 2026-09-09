# AGENTS.md — reps-tracker

Ce fichier donne les règles pour les agents (Muse Spark / OpenCode) travaillant sur ce repo.

## Projet
- **Nom:** reps-tracker — suivi d'entraînement "surcharge progressive"
- **Stack:** Vite 8 + React 19 + Tailwind CSS v4 (`@tailwindcss/vite`) + `oxlint`
- **Root du repo:** `01-firstone/` (c'est ici que sont `package.json`, `vite.config.js`, `src/`)
- **Deploy:** Vercel `consitent/reps-tracker` (root directory = `01-firstone`), GitHub `2sitrakamarcel-maker/reps-tracker` branch `main`
- **Langue:** Répondre en français si l'utilisateur parle français, sinon anglais. Code/commentaires en anglais.

## Commandes
- Dev: `npm run dev` (depuis `01-firstone/`)
- Build: `npm run build` (vérifier après chaque modif UI)
- Lint: `npm run lint`
- Deploy prod manuel: `vercel --prod --yes` (depuis `01-firstone/`, déjà `vercel link --project reps-tracker`)

## Structure
- `src/components/navbar.jsx` — navbar pill violette `[#9747FF]`, badge `DAY : TODAY` (lecture seule, jour réel auto via `new Date().getDay()`), tabs `Home|Stats|Plan` contrôlés par parent
- `src/components/Homepage.jsx` — orchestrateur: calcule `today` une fois (`useMemo` + `getDay()`), state `activeTab`, rend `HomeView`/`StatsView`/`PlanView`
- `src/components/HomeView.jsx` — tableau du jour: colonnes `TODAY'S REPS` (input text/number) + `LAST WEEK`
- `src/components/PlanView.jsx` — **tous les jours** `LUNDI→DIMANCHE` en `DAYS_ORDER.map()` scrollable `max-h-[60vh] overflow-y-auto`, chaque jour = liste d'inputs éditables `exercice`+`instruction`, `+ Ajouter un exercice`, highlight `today`
- `src/components/StatsView.jsx` — vraies stats (volume reps, filled/planned, surcharge % vs history) + bouton Reset semaine
- `src/hooks/useLocalStorage.js` — hook générique `useLocalStorage(key, initial)`
- `src/index.css` — doit contenir `@import "tailwindcss";` en première ligne (Tailwind v4)
- `vite.config.js` — plugins `[react(), tailwindcss()]`

## Conventions
- Tailwind v4 uniquement (pas de `tailwind.config.js` nécessaire, pas de `@tailwind` directives)
- Couleur principale: `#9747FF` (violet pill/border/header)
- Inputs éditables contrôlés avec `useState` + `onChange`
- Ajout/suppression d'exercices par jour avec `id: Date.now()`
- Pas de lib i18n — jours en majuscules `LUNDI…DIMANCHE`
- Commit en anglais `feat:`/`fix:`/`chore:`, push `origin main` après chaque feature validée
- Ne pas committer `.env.local` / `.vercel` / `node_modules` / `dist`

## Comment me donner des ordres
- Dépose une tâche dans ce fichier ou dis simplement: "fais X dans `src/components/...`"
- Exemples d'ordres valides:
  - "dans PlanView, ajoute persistance localStorage"
  - "refactor HomeView pour lire les données de PlanView"
  - "ajoute un bouton reset semaine"
  - "connecte à Supabase / ajoute auth"

## À faire (backlog)
- [x] Persistance `plans` + `reps` en localStorage (`Homepage.jsx` → `useLocalStorage`, keys `reps-tracker:plans-v1`/`reps-v1`/`history-v1`)
- [x] Partage d'état `plans` entre PlanView et HomeView (lifté dans `Homepage.jsx`, props)
- [x] Vrai `StatsView` avec métriques (volume, séances, surcharge) + validation reps `0-999` + couleur lastWeek
- [x] Mobile-first responsive (plein écran mobile, sticky navbar, `100dvh`, touch 44px)
- [ ] Graphe progression historique (chart)
- [ ] PWA / install prompt

## Notes agent
- Toujours vérifier `npm run build` avant `git push`
- Vérifier `vercel ls reps-tracker` si déploiement demandé
- Chemins Windows: `C:\Users\SEROLOGIE\mon_premier_jeu\STHMG\01-firstproject\01-firstone\...`
