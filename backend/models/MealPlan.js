const mongoose = require('mongoose');

// Each embedded meal stores the generated snapshot shown in the weekly plan and shopping list.
const mealSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      trim: true,
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mainIngredient: {
      type: String,
      required: true,
      trim: true,
    },
    usesLeftover: {
      type: Boolean,
      required: true,
    },
    missingIngredients: {
      type: [String],
      default: [],
    },
    score: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
  },
  { _id: true }
);

const mealPlanSchema = new mongoose.Schema(
  {
    planningMode: {
      type: String,
      enum: ['smart', 'fresh'],
      required: true,
    },
    meals: {
      type: [mealSchema],
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MealPlan', mealPlanSchema);
