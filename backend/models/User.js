const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return ;
  }

  this.password = await bcrypt.hash(this.password, 10);

});
module.exports = mongoose.model('User', userSchema);
