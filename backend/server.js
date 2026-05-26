const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const ingredientRoutes = require('./routes/ingredients');
const mealPlanRoutes = require('./routes/mealPlans');
const recipeRoutes = require('./routes/recipes');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',');

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'PlanEat backend is running.',
  });
});

// Lightweight health endpoint used by local checks, deployment smoke tests, and integration tests.
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'not_connected',
  });
});

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/meal-plans', mealPlanRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);

app.get('/api/db-status', (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.json({
    status: states[dbState] || 'unknown',
    readyState: dbState,
  });
});

// Explicit 404 handler keeps unknown routes consistent for both frontend debugging and API tests.
app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found.`,
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error.',
  });
});

/**
 * Connects the backend to MongoDB when a connection string is configured.
 *
 * @returns {Promise<void>}
 */
async function connectToDatabase() {
  const mongoUri = process.env.DB_CONNECTION_STRING;

  if (!mongoUri) {
    console.warn('DB_CONNECTION_STRING is not set. Starting server without MongoDB.');
    return;
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('MongoDB connected successfully.');
}

let server;

/**
 * Starts the API after the database layer has had a chance to initialize.
 *
 * @returns {Promise<void>}
 */
async function startServer() {
  try {
    await connectToDatabase();

    server = app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error.message);
    process.exit(1);
  }
}

startServer();

module.exports = { app, server };
