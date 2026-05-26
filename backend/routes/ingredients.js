const express = require('express');

const Ingredient = require('../models/Ingredient');
const auth = require('../middleware/auth');

const router = express.Router();

// Every inventory route is user-scoped through JWT auth.
router.use(auth);

// Returns the signed-in user's inventory, newest first for easier review in the UI.
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

// Creates a user-owned inventory item and only stores leftover state when it is relevant.
router.post('/', async (req, res, next) => {
  try {
    const { name, type = 'fresh', state } = req.body;

    const trimmedName = name?.trim();

    if (!trimmedName) {
      return res.status(400).json({
        message: 'Ingredient name is required.',
      });
    }

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

    const ingredientData = {
      userId: req.user.userId,
      name: trimmedName,
      type,
    };

    if (type === 'leftover' && state) {
      ingredientData.state = state;
    }

    const ingredient = await Ingredient.create(ingredientData);
    res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
});

// Deletes only ingredients owned by the current user to prevent cross-account access.
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
