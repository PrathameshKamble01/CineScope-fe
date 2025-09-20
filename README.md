# CineScope — React Frontend

CineScope is a responsive **movie listing & recommendation** frontend built with React.  
It displays movies, lets users read/write reviews, rate films, and discover personalized recommendations.

---

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Environment variables](#environment-variables)
  - [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Recommendation System (front-end)](#recommendation-system-front-end)
- [Design & Accessibility](#design--accessibility)
- [Testing & Linting](#testing--linting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Demo
> Add a link or GIF/screenshots here (replace placeholders below)

![screenshot-home](./docs/screenshot-home.png)  
![screenshot-detail](./docs/screenshot-detail.png)

---

## Features
- Browse latest/popular movies and search by title
- Movie detail pages with synopsis, cast, trailers, and reviews
- User reviews & ratings (create / edit / delete)
- Personalized recommendations (content-based & collaborative-ready)
- Favorites / Watchlist
- Pagination, sorting and filter options (genre, year, rating)
- Responsive UI for desktop & mobile
- Optional OAuth / JWT authentication (backend-dependent)
- Lightweight state management using React Context (or Redux — optional)

---

## Tech Stack
- **Framework:** React (React 18+, hooks)
- **Tooling:** Vite (recommended) or Create React App
- **HTTP:** Axios / Fetch API
- **Routing:** React Router
- **State:** React Context + hooks (or Redux)
- **Styling:** CSS Modules / Tailwind CSS / Styled-components (pick one)
- **Icons:** react-icons / lucide-react
- **Testing:** Jest + React Testing Library
- **Linting / Formatting:** ESLint + Prettier

> Adjust this list to match your exact choices.

---

## Getting Started

### Prerequisites
- Node.js >= 16
- npm >= 8 or yarn
- (Optional) A running backend API that provides endpoints for movies, reviews, users, recommendations.

### Install
```bash
# clone
git clone https://github.com/<your-username>/cinescope-frontend.git
cd cinescope-frontend

# install dependencies
npm install
# or
yarn
```

### Environment variables
Create a `.env` file in the project root (do **not** commit secrets). Example variables:
```
# Base URL of your backend API
VITE_API_BASE_URL=https://api.example.com

# Optional: third-party movie DB (e.g., TMDB) API key if you fetch directly
VITE_TMDB_API_KEY=your_tmdb_api_key

# Optional: auth callback / client id
VITE_OAUTH_CLIENT_ID=your_oauth_client_id
```
> Prefix for Vite is `VITE_`. If using CRA, use `REACT_APP_` prefix.

### Scripts
```bash
# dev (Vite)
npm run dev
# or (CRA)
npm start

# build for production
npm run build

# preview production build (Vite)
npm run preview

# run tests
npm test

# lint
npm run lint
```

---

## Project Structure
Example layout (modify to your real structure):
```
cinescope-frontend/
├─ public/
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ MovieCard/
│  │  ├─ Header/
│  │  └─ ReviewForm/
│  ├─ contexts/
│  ├─ hooks/
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  ├─ MovieDetail.jsx
│  │  └─ Profile.jsx
│  ├─ services/         # api clients (axios instances)
│  ├─ utils/
│  ├─ App.jsx
│  └─ main.jsx
├─ .env
├─ package.json
└─ README.md
```

---

## Recommendation System (front-end)
CineScope shows recommendations on the movie detail and user dashboard pages. Typical front-end approach:
1. **Content-based:** request `/recommendations/content?movieId=...` from backend that compares tags, genres, cast, keywords.
2. **Collaborative-ready:** backend provides `/recommendations/collab?userId=...` from collaborative filtering (front-end just fetches & displays).
3. **Client-side personalization:** store recent user interactions (localStorage) to present quick “Because you watched” lists (privacy-aware).

> Front-end responsibilities: request endpoints, cache responses, gracefully handle fallbacks (e.g., show popular movies if no recommendations).

---

## Design & Accessibility
- Mobile-first responsive layout
- Keyboard navigable components; semantic HTML
- Alt text for images; sufficient color contrast
- Use aria-* attributes where appropriate

---

## Testing & Linting
- Unit & integration tests with Jest + React Testing Library:
  - Test components render expected UI
  - Mock API calls using MSW (Mock Service Worker)
- Linting + Prettier for consistent style:
```bash
npm run lint
npm run format
```

---

## Deployment
- Build: `npm run build`
- Host static build on: Vercel, Netlify, Surge, GitHub Pages, or any static hosting.
- When deploying, set environment variables in hosting dashboard (e.g., VITE_API_BASE_URL).

---

## Environment & Production Tips
- Never expose backend secrets or long-lived tokens in front-end code.
- Use short-lived tokens (JWT) and refresh flows handled by backend.
- Use a CDN for static assets & images.
- Enable compression and set cache headers for production builds.

---

## Contributing
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit changes: `git commit -m "feat: add ..."`
4. Push & open a PR

Please include tests for significant features and keep PRs focused.

---

## Roadmap / Future Ideas
- Improve recommendation algorithms (hybrid models)
- Social features (follow users, like reviews)
- Watch parties / sync playback links
- Dark mode + theming
- Offline caching with service workers

---

## License
This project is licensed under the MIT License. See `LICENSE` for details.

---

## Contact
Project maintainer — Prathamesh Kamble  
Email: prathamesh.kamble.1221@gmail.com 
GitHub: `https://github.com/PrathameshKamble01/CineScope-fe`

---
