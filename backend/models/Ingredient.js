const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      trim: true,
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
  },
  { _id: false }
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MealPlan', mealPlanSchema);
