const express = require('express');
const router = express.Router();
const User = require('../models/schema-reg'); // Adjust the path based on your project structure
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Home route
const home = async (req, res) => {
  try {
    res.send("Hello, welcome to the home route of auth-controller.");
  } catch (error) {
    console.error("Error in home controller:", error);
    res.status(500).send("Server Error");
  }
};

// Registration route
const register = async (req, res) => {
  const { username, email, password, phoneno } = req.body;
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email: email.toLowerCase(), // Ensure email is saved in lowercase
      password: hashedPassword,
      phoneno
    });

    // Save the user
    await newUser.save();

    // Generate token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      token: token,
      userId: newUser._id.toString(),
    });
  } catch (error) {
    console.error('Error in register controller:', error);

    // Handle specific Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors });
    }

    res.status(500).json({ error: 'Server Error' });
  }
};

// Login route
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email (ensure case-insensitive search)
    const userExist = await User.findOne({ email: email.toLowerCase() });

    if (!userExist) {
      return res.status(400).json({ msg: 'Invalid Email' });
    }

    // Check if password exists
    if (!userExist.password) {
      return res.status(400).json({ msg: 'Password not set for this user' });
    }

    // Compare the input password with the hashed password
    const isMatch = await bcrypt.compare(password, userExist.password);

    if (isMatch) {
      // Generate token if the password matches
      const token = jwt.sign(
        {
          userId: userExist._id,  // User ID
          email: userExist.email,  // Include email
          isAdmin: userExist.admin // Include admin status if necessary
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );
      
      return res.status(200).json({
        message: 'User logged in successfully',
        token: token,
        userId: userExist._id.toString(),
        email: userExist.email,  // Correctly assign the email from userExist
        isAdmin: userExist.admin// Correctly assign admin status from userExist
      });
    } else {
      return res.status(401).json({ msg: 'Incorrect Email or Password' });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};


// User route to get authenticated user details
const user = async (req, res) => {
  try {
   
    const userData = req.user;
    //console.log(userData);
    return res.status(200).json({ msg: userData });

  } catch (error) {
    console.log(`Error from user route: ${error}`);
    res.status(500).json({ message: "Error fetching user data" });
  }
};

module.exports = { home, register, login, user };
