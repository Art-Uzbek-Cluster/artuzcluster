# Milly Cluster React App

A simple React + Vite project with authentication pages and local storage user management.

## Features

- Home page with Telegram, Google, and Mail.ru login buttons
- Registration page with username, email, and password validation
- Login page with email/password validation
- User storage with browser local storage for accounts
- React Router navigation
- Basic form feedback and success/error messages

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Launch development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Project structure

- `src/App.tsx` — main router and layout
- `src/pages/Home.tsx` — landing page
- `src/pages/Login.tsx` — login form page
- `src/pages/Register.tsx` — registration form page
- `src/utils/auth.ts` — local storage user management
- `src/styles/index.css` — shared application styles

## Notes

- OAuth buttons are currently placeholders for future integration.
- Passwords are stored in plain text in local storage for demo purposes only. Replace with secure backend logic for production.
