const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: ''
  },
  city: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: null
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', ''],
    default: ''
  },
  height: {
    type: Number,
    default: null
  },
  weight: {
    type: Number,
    default: null
  },
});

module.exports = mongoose.model('User', userSchema);
