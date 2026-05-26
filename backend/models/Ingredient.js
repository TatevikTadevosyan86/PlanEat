const mongoose = require('mongoose');

// Inventory items belong to one authenticated user and can optionally describe the state of leftovers.
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
    state: {
      type: String,
      enum: ['boiled', 'steamed', 'fried', 'baked', 'grilled', 'chopped', 'cooked'],
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

module.exports = mongoose.model('Ingredient', ingredientSchema);
