const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  course: String,
  year: String,
  section: String,
  classroom: String
});

const AssignClassroom = mongoose.model('AssignClassroom', classroomSchema);

module.exports = AssignClassroom;
