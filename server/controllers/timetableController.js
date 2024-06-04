
// Subjects 
const subjectModel = require('../models/subjectModel');

// Teacher
const Teacher = require('../models/teacherModel');

//Classroom
const Classroom = require('../models/classroomModel')

// Assign Theory,Lab,Electives
const TheoryAssignment = require('../models/assignSubjectsModel');

// Assignn Classrooms
const AssignClassroom = require('../models/classAssignModel')


const { response } = require('express');

exports.addSubject = async (req, res) => {
    console.log(req.body)
    try {
        const subjectData = req.body;
        const newSubject = await subjectModel.create(subjectData);
        res.status(201).json({ success: true, data: newSubject });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.fetchSubject = async (req, res) => {
    try {
        const fetchSubject = await subjectModel.find();
        res.status(201).json({ success: true, data: fetchSubject });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteSubject = async (req, res) => {
    try {
        const subjectId = req.params.id;
        console.log(subjectId, "this is the id")
        const deletedSubject = await subjectModel.findByIdAndDelete({ _id: subjectId });
        if (!deletedSubject) {
            return res.status(404).json({ success: false, message: "Subject not found" });
        }
        res.status(200).json({ success: true, data: deletedSubject });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Teacher

exports.addTeacher = async (req, res) => {
    console.log(req.body);
    try {
        const teacherData = req.body;
        const newTeacher = await Teacher.create(teacherData);
        res.status(201).json({ success: true, data: newTeacher });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.fetchTeacher = async (req, res) => {
    try {
        const fetchTeacher = await Teacher.find({});
        res.status(201).json({ success: true, data: fetchTeacher });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;
        console.log(teacherId, "this is the id")
        const deleteTeacher = await Teacher.findByIdAndDelete({ _id: teacherId });
        if (!deleteTeacher) {
            return res.status(404).json({ success: false, message: "Subject not found" });
        }
        res.status(200).json({ success: true, data: deleteTeacher });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


//ClassRooms

exports.addClassroom = async (req, res ) => {
    console.log(req.body)
    try {
        const { classroomName } = req.body;
        const classroom = new Classroom({ classroomName });
        await classroom.save();
        res.status(201).json({ message: 'Classroom added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.fetchClassroom = async (req, res) => {
    try {
        const fetchClassroom = await Classroom.find({});
        res.status(201).json({ success: true, data: fetchClassroom });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteClassroom = async (req, res) => {
    try {
        const classroomID = req.params.id;
        console.log(classroomID, "this is the classroom id")
        const deletedClassrooms = await Classroom.findByIdAndDelete({ _id: classroomID });
        if (!deletedClassrooms) {
            return res.status(404).json({ success: false, message: "Classroom not found" });
        }
        res.status(200).json({ success: true, data: deletedClassrooms });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Theory Assign

exports.createAssignment = async (req, res) => {
    try {
        const { subjectId, teacherId } = req.body;
        console.log(subjectId)
        const assignment = new TheoryAssignment({ subjectId, teacherId });
        await assignment.save();
        res.status(201).send(assignment);
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).send('Error creating assignment');
    }
};

exports.fetchassignments = async (req, res) => {
    try {
        const fetchassignments = await TheoryAssignment.find({}).populate('subjectId').populate('teacherId').exec();
        res.status(201).json({ success: true, data: fetchassignments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.DeleteAssignments = async (req, res) => {
    try {
        const AssignmentId = req.params.id;
        console.log(AssignmentId, "this is the theory assignment id")
        const deletedAssignments = await TheoryAssignment.findByIdAndDelete({ _id: AssignmentId });
        if (!deletedAssignments) {
            return res.status(404).json({ success: false, message: "Assignment not found" });
        }
        res.status(200).json({ success: true, data: deletedAssignments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Elective Subjects

exports.AddElective = async (req, res) => {
    try {
        const { subjectId, teacherId } = req.body;
        console.log(teacherId)
        const assignment = new TheoryAssignment({ subjectId, teacherId });
        await assignment.save();
        res.status(201).send(assignment);
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).send('Error creating assignment');
    }
};


exports.fetchelectives = async (req, res) => {
    try {
        const fetchElectives = await TheoryAssignment.find({}).populate('subjectId teacherId').exec();
        res.status(201).json({ success: true, data: fetchElectives });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.DeleteElective = async (req, res) => {
    try {
        const ElectiveId = req.params.id;
        console.log(ElectiveId, "this is the elective assignment id")
        const deletedElectives = await TheoryAssignment.findByIdAndDelete({ _id: ElectiveId });
        if (!deletedElectives) {
            return res.status(404).json({ success: false, message: "Assignment not found" });
        }
        res.status(200).json({ success: true, data: deletedElectives });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Lab Subjects

exports.AddLab = async (req, res) => {
    try {
        const { subjectId, teacherId } = req.body;
        console.log(subjectId)
        const assignment = new TheoryAssignment({ subjectId, teacherId });
        await assignment.save();
        res.status(201).send(assignment);
    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).send('Error creating assignment');
    }
};

exports.fetchLabs = async (req, res) => {
    try {
        const fetchLabs = await TheoryAssignment.find({}).populate('subjectId teacherId').exec();;
        res.status(201).json({ success: true, data: fetchLabs });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


// Controller function to assign classroom
exports.assignClassRoom = async (req, res) => {
    console.log(req.body)
    try {
        const { course, year, section, classroom } = req.body;
        const newClassroomAssignment = new AssignClassroom({ course, year, section, classroom });
        await newClassroomAssignment.save();
        res.status(201).json({ message: 'Classroom assigned successfully', data: newClassroomAssignment });
    } catch (error) {
        console.error('Error assigning classroom:', error);
        res.status(500).json({ error: 'Failed to assign classroom' });
    }
};

exports.fetchClassRooms = async (req, res) => {
    try {
        const classroomAssignments = await AssignClassroom.find();
        res.status(200).json({ data: classroomAssignments });
    } catch (error) {
        console.error('Error fetching classroom assignments:', error);
        res.status(500).json({ error: 'Failed to fetch classroom assignments' });
    }
};

exports.removeClassRoom = async (req, res) => {
    try {
        const { id } = req.params; // Adjusted here
        const roomassignmentId = id
        console.log(roomassignmentId, "this is the room assignment id")

        const deletedAssignment = await AssignClassroom.findByIdAndDelete({ _id: roomassignmentId });

        if (!deletedAssignment) {
            return res.status(404).json({ success: false, message: 'Classroom assignment not found' });
        }

        return res.status(200).json({ success: true, message: 'Classroom assignment deleted successfully' });
    } catch (error) {
        console.error('Error deleting classroom assignment:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


