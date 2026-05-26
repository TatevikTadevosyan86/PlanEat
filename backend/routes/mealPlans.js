const express = require('express');
const MealPlan = require('../models/MealPlan');
const auth = require('../middleware/auth');


const router = express.Router();
router.use(auth);

// Returns the latest saved plan for the authenticated user, optionally limited to one planning mode.
router.get('/latest', async (req, res, next) => {
  try {
    const query = {
      userId: req.user.userId,
    }

    if (req.query.planningMode) {
      query.planningMode = req.query.planningMode
    }

    const latestMealPlan = await MealPlan.findOne(query).sort({
      createdAt: -1,
    })

    if (!latestMealPlan) {
      return res.status(404).json({
        message: 'No saved meal plan found.',
      });
    }

    res.json(latestMealPlan);
  } catch (error) {
    next(error);
  }
});

// Saves a generated meal plan snapshot for the authenticated user.
router.post('/', async (req, res, next) => {
  try {
    const { planningMode, meals } = req.body;

    if (!planningMode || !Array.isArray(meals) || meals.length === 0) {
      return res.status(400).json({
        message: 'Planning mode and meals are required.',
      });
    }

    const mealPlan = await MealPlan.create({
      planningMode,
      meals,
      userId: req.user.userId,
    });

    res.status(201).json(mealPlan);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
