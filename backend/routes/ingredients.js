const express = require('express');
const Ingredient = require('../models/Ingredient');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(auth);

router.get('/', async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, type = 'fresh', state } = req.body;  // ← added state

    const trimmedName = name?.trim();

    if (!trimmedName) {
      return res.status(400).json({
        message: 'Ingredient name is required.',
      });
    }

    // Check duplicate ingredient
    const existingIngredient = await Ingredient.findOne({
      userId: req.user.userId,
      name: new RegExp(`^${trimmedName}$`, 'i'),
      type,
    });

    if (existingIngredient) {
      return res.status(409).json({
        message: 'This ingredient already exists in the selected type.',
      });
    }

    // Build ingredient data
    const ingredientData = {
      userId: req.user.userId,
      name: trimmedName,
      type,
    };

    // Only add state if type is 'leftover' and state is provided
    if (type === 'leftover' && state) {
      ingredientData.state = state;
    }

    const ingredient = await Ingredient.create(ingredientData);
    res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!ingredient) {
      return res.status(404).json({
        message: 'Ingredient not found.',
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;