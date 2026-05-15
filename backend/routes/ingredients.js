const express = require('express');
const Ingredient = require('../models/Ingredient');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const ingredients = await Ingredient.find().sort({ createdAt: -1 });
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, type = 'fresh' , state = 'baked'  } = req.body;
    const trimmedName = name?.trim();
    const existingIngredient = await Ingredient.findOne({
  name: new RegExp(`^${trimmedName}$`, 'i'),
  type,
});
if (existingIngredient) {
  return res.status(409).json({
    message: 'This ingredient already exists in the selected type.',
  });
}


    if (!trimmedName) {
      return res.status(400).json({
        message: 'Ingredient name is required.',
      });
    }

    const ingredient = await Ingredient.create({
      name: trimmedName,
      type,
      state,
    });

    res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);

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
