const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['fresh', 'leftover'],
      default: 'fresh',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Ingredient', ingredientSchema);
