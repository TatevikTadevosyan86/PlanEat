const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const auth = require('../middleware/auth');

// Creates a new user account after validating basic registration input.
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();
    const trimmedName = name?.trim();

    if (!normalizedEmail || !password || !trimmedName) {
      return res.status(400).json({
        message: 'Name, email, and password are required.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters long.',
      });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        message: 'User with this email already exists.',
      });
    }

    const user = await User.create({
      email: normalizedEmail,
      password,
      name: trimmedName,
    });

    res.status(201).json({
      message: 'User created successfully.',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Authenticates a user and returns a JWT plus the public user payload.
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({
        message: 'Email and password are required.',
      });
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Returns the currently authenticated user for frontend session restoration.
router.get('/me', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
