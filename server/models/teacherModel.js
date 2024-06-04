const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: true
  },
  teacherID: {
    type: String,
    required: true,
    unique: true
  },
  preferences: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
