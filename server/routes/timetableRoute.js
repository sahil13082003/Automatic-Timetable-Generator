
const express = require('express');
const timetableRouter = express.Router();
const { addSubject, fetchSubject, deleteSubject, addTeacher, fetchTeacher, deleteTeacher, addClassroom, fetchClassroom, deleteClassroom, createAssignment, fetchassignments, DeleteAssignments, AddElective, fetchelectives, DeleteElective, AddLab, fetchLabs, assignClassRoom, fetchClassRooms, removeClassRoom } = require('../controllers/timetableController');
// const {generate } from '../controllers/generate.js';
const { generateTimetableForAllSemesters } = require('../controllers/server.js')
// const { generateTimetableForAllSemesters } = require('../controllers/timetable');

// Subjects Routing
timetableRouter.post('/addsubjects', addSubject);
timetableRouter.get('/fetchsubjects', fetchSubject);
timetableRouter.delete('/deletesubject/:id', deleteSubject);
// timetableRouter.delete('/deletesubject/:id', deleteSubject);


// Teachers Routing
timetableRouter.post('/teachers', addTeacher);
timetableRouter.get('/fetchteachers', fetchTeacher);
timetableRouter.delete('/deleteteacher/:id', deleteTeacher);
 
//ClassRooms Routing
timetableRouter.post('/classrooms', addClassroom);
timetableRouter.get("/fetchclassroom", fetchClassroom)
timetableRouter.delete('/deleteClassroom/:id', deleteClassroom)

// Theory Assign
timetableRouter.post('/theoryassignments', createAssignment);
timetableRouter.get('/fetchassignments', fetchassignments);
timetableRouter.delete('/deleteAssignments/:id', DeleteAssignments);

// Electives Assign
timetableRouter.post('/electiveassignments', AddElective);
timetableRouter.get('/fetchelective', fetchelectives)
timetableRouter.delete('/deleteelective/:id', DeleteElective)

// Lab  assign 
timetableRouter.post('/labassignments', AddLab);
timetableRouter.get('/fetchlabs', fetchLabs);

// Classrooms Assign
timetableRouter.post('/assignclassrooms', assignClassRoom);
timetableRouter.get('/fetchclassrooms', fetchClassRooms);
timetableRouter.delete('/removeclassroom/:id', removeClassRoom);
// timetableRouter.get('/generate', generate);


timetableRouter.get('/generateTimeTable', generateTimetableForAllSemesters);

module.exports = timetableRouter;
