const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    height: Number,
    weight: Number,
    dietPlan: { type: String, default: '' },
    workoutPlan: { type: String, default: '' },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
