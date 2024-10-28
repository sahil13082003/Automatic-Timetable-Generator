const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  subjectId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}],
  teacherId: [{type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'}],
});

const TheoryAssignment = mongoose.model('AssignSubjects', assignmentSchema);

module.exports = TheoryAssignment;
