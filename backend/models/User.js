const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  email: String,
  password: String,

  // From second form
  age: Number,
  gender: String,
  height: Number,
  weight: Number,
  activityLevel: String,
  fitnessGoal: String,
  phoneNumber: String,
  allergies: String,
  medicalConditions: String
});

module.exports = mongoose.model('User', userSchema);
