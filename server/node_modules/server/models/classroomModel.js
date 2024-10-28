// models/Classroom.js
const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  classroomName: {
    type: String,
    required: true
  }
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
