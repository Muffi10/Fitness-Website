const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign up route
router.post('/signup', async (req, res) => {
    const { name, email, password, height, weight } = req.body;

    try {
        const newUser = new User({ name, email, password, height, weight });
        await newUser.save();
        res.status(201).send('User signed up successfully');
    } catch (error) {
        res.status(500).send('Error signing up user: ' + error.message);
    }
});

// Sign in route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (error) {
        res.status(500).send('Error signing in user: ' + error.message);
    }
});

// Route to save workout plan for a user
router.post('/saveWorkoutPlan', async (req, res) => {
    const { userId, workoutPlan } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.workoutPlan = workoutPlan;
        await user.save();

        res.status(200).send('Workout plan saved successfully');
    } catch (error) {
        res.status(500).send('Error saving workout plan: ' + error.message);
    }
});

module.exports = router;
