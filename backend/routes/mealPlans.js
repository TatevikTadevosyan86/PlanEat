const express = require('express');
const MealPlan = require('../models/MealPlan');
const auth = require('../middleware/auth');


const router = express.Router();
router.use(auth);



router.get('/latest', async (req, res, next) => {
  try {
    const latestMealPlan = await MealPlan.findOne({
  userId: req.user.userId,
}).sort({ createdAt: -1 });

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
