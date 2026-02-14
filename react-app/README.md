# React App

A React single-page application built with **Vite** and **React Router**, featuring a navigation bar and multiple pages (Home, Dashboard, Login).

## Tech Stack

- **React** 18
- **Vite** 5 – build tool and dev server
- **React Router DOM** 6 – client-side routing
- **ESLint** – linting

## Project Structure

```
react-app/
├── public/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Button.jsx
│   │   └── NavBar.jsx
│   ├── pages/          # Route-level pages
│   │   ├── Homepage.jsx
│   │   ├── Dashboard.jsx
│   │   └── Login.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Prerequisites

- **Node.js** (v16 or newer recommended)
- **npm** (comes with Node.js)

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite shows in the terminal).

### Build for production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview production build

```bash
npm run preview
```

## Routes

| Path         | Page      | Description                    |
| ------------ | --------- | ------------------------------ |
| `/`          | Homepage  | Landing / home page            |
| `/dashboard` | Dashboard | Dashboard with counter example |
| `/login`     | Login     | Login page                     |

## Main Features

- **NavBar** – Top navigation with links to Home, Dashboard, and Login; active route is highlighted.
- **Dashboard** – Simple counter demo using React state and a reusable `Button` component.
- **Components** – `NavBar` for navigation, `Button` for actions (e.g. increment).
