const mongoose = require('mongoose');

// Recipes keep a lightweight ingredient structure because the planner mostly needs names and quantities.
const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String },
  unit: { type: String },
});

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ingredients: [ingredientSchema],
    instructions: [{ type: String }],
    mainIngredient: { type: String, required: true },
    usesLeftover: { type: Boolean, default: false },
    cuisine: { type: String },
    prepTime: { type: Number, default: 30 },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
