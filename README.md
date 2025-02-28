# AI Chat

A modern chat application built with React and Vite that provides an interactive AI chat experience.

## Features

- Real-time chat interface
- Chat history management
- Modern and responsive UI
- Auto-expanding text area

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

## Getting Started

Follow these steps to set up and run the project locally:

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

Make sure your `.env` file contains the following variables:

```
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Tech Stack

- React
- Vite
- Redux + Redux Saga
- Tailwind CSS
- Axios
