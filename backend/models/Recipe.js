const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String },
  unit: { type: String }
});

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ingredients: [ingredientSchema],  // Array of ingredient objects
    instructions: [{ type: String }], // Array of instruction steps
    mainIngredient: { type: String, required: true },
    usesLeftover: { type: Boolean, default: false },
    prepTime: { type: Number, default: 30 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);