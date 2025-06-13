const mongoose = require('mongoose');

const fitnessDataSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: String, required: true },
  steps: Number,
  heartRate: Number,
  calories: Number,
  weight: Number,
  spo2: Number,

  // Newly added fields for diet plan logic
  sleepQuality: {
    type: String,
    enum: ['Good', 'Average', 'Poor']
  },
  sugarStatus: {
    type: String,
    enum: ['Normal', 'Prediabetic', 'Diabetic']
  },
  bpStatus: {
    type: String,
    enum: ['Normal', 'Prehypertension', 'Hypertension']
  },
  cholesterol: {
    type: String,
    enum: ['Normal', 'Borderline High', 'High']
  },
  activityLevel: {
    type: String,
    enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active']
  }
});

// Ensure only one entry per user per date
fitnessDataSchema.index({ email: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('FitnessData', fitnessDataSchema);
