// models/Subject.js

const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectType: {
        type: String,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: function () {
            return this.subjectType === 'Theory' || this.subjectType === 'Elective';
        }
    },
    lecturesPerWeek: {
        type: Number,
        required: function () {
            return this.subjectType === 'Theory' || this.subjectType === 'Elective';
        }
    },
    labsPerWeek: {
        type: Number,
        required: function () {
            return this.subjectType === 'Lab';
        }
    },
    department: {
        type: String,
        required: true
    }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
