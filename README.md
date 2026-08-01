# 🎬 CineVault — Premium Movie Discovery Platform

> **Discover. Watch. Remember.**

CineVault is an award-winning style, production-ready movie discovery platform built with React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, React Three Fiber, Node.js, Express, MongoDB Atlas, and Firebase Authentication.

---

## 🌟 Key Features

* **Cinematic Home Page**: Featuring auto-rotating hero banners, featured collections, trending lists, now playing films, upcoming releases, and curated genre showcases.
* **Instant Command Palette (Cmd/Ctrl + K)**: Fast, debounced search with recent history and keyboard arrow navigation.
* **Comprehensive Movie Details**: Full high-definition backdrop imagery, cast carousels, official trailers (YouTube modal embed), ratings, financials (budget/revenue), and recommendations.
* **Filterable Discovery & Categories**: Explore films by genre, release year, ratings, or title with infinite scroll pagination.
* **Firebase Authentication**: Email/Password login, registration, email verification, password reset, and protected user routes.
* **Custom Backend REST API**: Node.js & Express server connected to MongoDB Atlas storing user favorites, watchlists, reviews, and profile preferences.
* **Subtle 3D Depth**: Ambient 3D particles powered by React Three Fiber and Three.js in the hero banner.
* **Accessibility & Motion**: Meets WCAG AA guidelines with keyboard navigation, focus management, and `prefers-reduced-motion` support.

---

## 🏗️ Folder Structure

```
d:\movievault\
├── frontend/                     # React 19 + Vite + TypeScript
│   ├── src/
│   │   ├── animations/           # Framer Motion variants & transitions
│   │   ├── api/                  # Axios clients, TMDB API & Backend API
│   │   ├── components/           # UI components
│   │   │   ├── auth/             # LoginForm, RegisterForm, ForgotPasswordForm
│   │   │   ├── common/           # Skeleton loaders, ErrorBoundary, EmptyState, AnimatedPage
│   │   │   ├── layout/           # Header, Footer, MobileNav
│   │   │   ├── movie/            # MovieCard, MovieGrid, MovieHero, MovieRow, CastCard, TrailerModal
│   │   │   ├── search/           # SearchModal command palette
│   │   │   └── three/            # HeroParticles (React Three Fiber)
│   │   ├── config/               # Constants, Routes, Firebase config
│   │   ├── context/              # AuthContext provider
│   │   ├── hooks/                # Custom React hooks (useMovies, useSearch, useKeyboard, etc.)
│   │   ├── layouts/              # RootLayout with AnimatePresence
│   │   ├── pages/                # 16 complete page views
│   │   ├── providers/            # TanStack QueryProvider
│   │   ├── routes/               # React Router & ProtectedRoute
│   │   ├── services/             # Auth service
│   │   ├── store/                # Zustand UI & persistent search stores
│   │   ├── styles/               # Tailwind CSS v4 design system
│   │   ├── types/                # TypeScript interfaces (Movie, User, Review, API)
│   │   └── utils/                # Formatting, image URL helpers, cn utility
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                      # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/               # Database & Firebase Admin SDK configs
│   │   ├── controllers/          # Auth, Favorites, Watchlist, Reviews, Users controllers
│   │   ├── middleware/           # Firebase Auth token verification & Error Handler
│   │   ├── models/               # Mongoose models (User, Favorite, Watchlist, Review)
│   │   ├── routes/               # Express REST routes
│   │   └── app.js                # Express app setup with CORS & Helmet
│   ├── package.json
│   └── server.js                 # HTTP listener & database connection
│
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend Setup (`frontend/.env`)

Create a `.env` file inside `frontend/`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_BACKEND_URL=http://localhost:5000
```

### Backend Setup (`backend/.env`)

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cinevault?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
FIREBASE_SERVICE_ACCOUNT=./firebase-service-account.json
```

---

## 🚀 Step-by-Step Local Running Guide

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Start Frontend Development Server

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 4. Start Backend Server

```bash
npm run dev
```
The Express server will start on [http://localhost:5000](http://localhost:5000).

---

## 🗝️ API Keys & Service Integrations

### 🎬 TMDB API Setup
1. Register a free account at [TheMovieDB.org](https://www.themoviedb.org/).
2. Navigate to **Account Settings > API** and request an API key.
3. Copy your API Key v3 into `VITE_TMDB_API_KEY` in `frontend/.env`.

### 🔥 Firebase Authentication Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Under **Build > Authentication**, enable **Email/Password** sign-in provider.
3. In **Project Settings > General**, add a Web App to get your config credentials.
4. Copy the config variables into `frontend/.env`.

### 🍃 MongoDB Atlas Setup
1. Create a free cluster on [MongoDB Atlas](https://cloud.mongodb.com/).
2. Create a Database User and whitelist your IP address (or `0.0.0.0/0` for cloud deployment).
3. Copy the Connection String into `MONGODB_URI` in `backend/.env`.

---

## 📡 Backend REST API Documentation

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/sync` | ✅ | Synchronize Firebase user session with MongoDB |
| `GET` | `/api/users/me` | ✅ | Fetch current user profile & preferences |
| `PUT` | `/api/users/me` | ✅ | Update profile display name & preferences |
| `GET` | `/api/favorites` | ✅ | Get list of user's favorited movies |
| `POST` | `/api/favorites` | ✅ | Add movie to user favorites |
| `DELETE` | `/api/favorites/:movieId` | ✅ | Remove movie from user favorites |
| `GET` | `/api/favorites/check/:movieId` | ✅ | Check if movie is favorited |
| `GET` | `/api/watchlist` | ✅ | Get user's saved watchlist |
| `POST` | `/api/watchlist` | ✅ | Add movie to watchlist |
| `PUT` | `/api/watchlist/:movieId` | ✅ | Update watched status |
| `DELETE` | `/api/watchlist/:movieId` | ✅ | Remove movie from watchlist |
| `GET` | `/api/reviews/movie/:movieId` | ❌ | Fetch all public reviews for a movie |
| `GET` | `/api/reviews/user` | ✅ | Fetch all reviews authored by user |
| `POST` | `/api/reviews` | ✅ | Submit a new movie review |
| `PUT` | `/api/reviews/:id` | ✅ | Update an existing user review |
| `DELETE` | `/api/reviews/:id` | ✅ | Delete a user review |

---

## 🌐 Cloud Deployment Instructions

### Deploying Frontend to Vercel
1. Push repository to GitHub.
2. Import `frontend` project on [Vercel](https://vercel.com).
3. Set Framework Preset to **Vite**.
4. Add all environment variables from `frontend/.env`.
5. Click **Deploy**.

### Deploying Backend to Render
1. Create a Web Service on [Render](https://render.com).
2. Connect your repository and set Root Directory to `backend`.
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Add environment variables (`MONGODB_URI`, `FRONTEND_URL`, etc.).
6. Deploy.
