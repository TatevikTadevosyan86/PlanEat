const express = require('express');

const Recipe = require('../models/Recipe');

const router = express.Router();

// Recipe collection is public to the authenticated frontend because meal planning depends on reading the catalog.
router.get('/', async (_req, res) => {
  try {
    const recipes = await Recipe.find().sort({ name: 1 });
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching recipes' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching recipe' });
  }
});

module.exports = router;
