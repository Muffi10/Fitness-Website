const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fitness', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  height: Number,
  weight: Number,
  email: String,
  password: String,
  dietPlan: String, // Add dietPlan field
  workoutPlan: String
});

const User = mongoose.model('User', userSchema);

// Route to handle user signup
app.post('/signup', async (req, res) => {
  const { name, height, weight, email, password } = req.body;
  const newUser = new User({ name, height, weight, email, password });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Fitness App Backend!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
