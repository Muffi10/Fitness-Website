const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS package

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fitness', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define User schema
const UserSchema = new mongoose.Schema({
    name: String,
    height: Number,
    weight: Number,
    email: { type: String, unique: true },
    password: String
});

// Create User model
const User = mongoose.model('User', UserSchema);

// Sign-up route
app.post('/signup', async (req, res) => {
    const { name, height, weight, email, password } = req.body;
    try {
        const newUser = new User({ name, height, weight, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login route
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

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
