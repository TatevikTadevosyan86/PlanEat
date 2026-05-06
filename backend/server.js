const mealPlanRoutes = require('./routes/mealPlans');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const ingredientRoutes = require('./routes/ingredients');

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin,
  }),
);
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: 'PlanEat backend is running.',
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database:
      mongoose.connection.readyState === 1 ? 'connected' : 'not_connected',
  });
});

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/meal-plans', mealPlanRoutes);


// Optional: Detailed database status endpoint
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

async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn('MONGO_URI is not set. Starting server without MongoDB.');
    return;
  }

  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('✅ MongoDB connected successfully.');
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing server...');
  await mongoose.disconnect();
  console.log('MongoDB disconnected.');
  process.exit(0);
});

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`🚀 Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend:', error.message);
    process.exit(1);
  }
}

startServer();
