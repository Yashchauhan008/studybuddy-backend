require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user.model");

const bcryptSecret = process.env.BCRYPTSECRET;
const jwtSecret = process.env.JWT_SECRET;

// Sign-Up Controller
const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password + bcryptSecret, salt);

    user = new User({ username, email, password: hashedPassword });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Sign-In Controller
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password + bcryptSecret, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Update lastLogin field
    user.lastLogin = Date.now();
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ message: 'User signed in successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add User Without Password Controller
const addUser = async (req, res) => {
  try {
    const { username, email, name, profileUrl, role, workplace } = req.body;

    // Basic validation
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    // Check if the role is valid
    const validRoles = ['admin', 'student'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if user with the same username or email already exists
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      name,
      profileUrl,
      role,
      workplace,
      lastLogin:Date.now()
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal server error: ${error.message}` });
  }
};
module.exports = { signUp, signIn, addUser };
