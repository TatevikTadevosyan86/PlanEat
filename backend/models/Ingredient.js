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
    state: {
      type: String,
      enum: ['boiled', 'steamed', 'fried', 'baked', 'grilled', 'chopped', 'cooked'],
      default: 'cooked',
  },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ingredient', ingredientSchema);
