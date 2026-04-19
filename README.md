# PlanEat

PlanEat is a full-stack web application concept for planning meals, organizing food choices, and building a smoother day-to-day eating routine.

The idea behind the project is simple: help users decide what to eat, plan ahead, and eventually manage meals in a more structured way instead of making last-minute choices every day.

## Project overview

This repository contains a separate frontend and backend:

- `frontend` is a React application built with Vite
- `backend` is a Node.js and Express API

The long-term goal of PlanEat is to become a meal-planning platform where users can:

- create and manage meal plans
- browse or save meal ideas
- organize meals for different days
- connect food planning with user accounts and stored data

## Why this project exists

Meal planning is a common problem for students, families, and busy professionals. People often know they want to eat better or save time, but they do not always have a simple system for deciding what to cook or eat.

PlanEat is intended to solve that by combining a clean frontend experience with a backend that can manage user data, future meal entries, and application logic.

## Current state

The project is currently in the setup and foundation stage.

What is already in place:

- a Vite + React frontend structure
- a Node.js + Express backend structure
- environment variable support with `dotenv`
- MongoDB connection support with `mongoose`
- basic backend middleware setup for JSON handling and CORS
- health-check style API routes

What is not finished yet:

- real application pages in the frontend
- authentication flow
- database models
- controllers and business logic
- production-ready API routes

## Planned features

The following features represent the intended direction of the project:

- user registration and login
- personalized meal planning
- daily and weekly meal schedules
- saved meals or favorite dishes
- backend data persistence with MongoDB
- frontend integration with API endpoints
- responsive design for desktop and mobile use

## Tech stack

### Frontend

- React
- Vite
- React Router DOM
- Axios

### Backend

- Node.js
- Express
- Mongoose
- dotenv
- CORS
- bcryptjs
- jsonwebtoken

### Database

- MongoDB

## Project structure

```text
planeat/
|-- backend/
|   |-- server.js
|   |-- package.json
|   |-- package-lock.json
|   `-- .env.example
|-- frontend/
|   |-- public/
|   |-- src/
|   |-- package.json
|   `-- package-lock.json
`-- README.md
```

## How the app is organized

The frontend is responsible for the user interface and user interactions.

The backend is responsible for:

- exposing API endpoints
- handling future business logic
- connecting to MongoDB
- managing secure server-side behavior

This separation makes it easier to scale the project and develop the client and server independently.

## Requirements

Before running the project, make sure you have:

- Node.js 18 or newer
- npm
- MongoDB installed locally, or a remote MongoDB connection string

## Installation

Dependencies are installed separately for the frontend and backend.

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Environment variables

Inside `backend`, create a `.env` file based on `.env.example`.

Example:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/planeat
```

Variable descriptions:

- `PORT` sets the backend server port
- `CLIENT_URL` allows the frontend to access the backend through CORS
- `MONGO_URI` is the MongoDB connection string

## Running the project

Use two terminals so the frontend and backend can run at the same time.

### Start the backend

```bash
cd backend
npm run dev
```

By default, the backend runs at `http://localhost:5000`.

Available base endpoints:

- `GET /`
- `GET /api/health`

### Start the frontend

```bash
cd frontend
npm run dev
```

By default, the frontend runs at `http://localhost:5173`.

## Available scripts

### Backend scripts

```bash
npm run dev
npm start
npm test
```

### Frontend scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Backend notes

- The backend entry point is `backend/server.js`
- The backend can start even if `MONGO_URI` is missing
- When MongoDB is not configured, the health route reports that the database is not connected
- CORS is configured through `CLIENT_URL`

## Development roadmap

- build actual PlanEat pages in the frontend
- add authentication routes and JWT handling
- create MongoDB models for users and meals
- add controllers and route modules
- connect frontend forms to backend APIs
- improve styling and user experience
- add validation, error handling, and tests

## Summary

PlanEat is a promising full-stack starter for a meal-planning application. The technical foundation is now separated into frontend and backend apps, and the next phase is turning that setup into a real product with user-facing features and persistent data.
