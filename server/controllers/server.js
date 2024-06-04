


// ............................................fully working code ........................................................//

// const Subject = require('../models/subjectModel');
// const Teacher = require('../models/teacherModel');
// const TheoryAssignment = require('../models/assignSubjectsModel');

// // Function to shuffle an array
// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// // Initialize teacher availability object
// const teacherAvailability = {};

// // Function to initialize teacher availability
// async function initializeTeacherAvailability() {
//     const teachers = await Teacher.find();
//     for (const teacher of teachers) {
//         if (!teacherAvailability[teacher.teacherName]) {
//             teacherAvailability[teacher.teacherName] = Array.from({ length: 6 }, () => Array(6).fill(true));
//         }
//     }
// }

// function canHaveLecture(subject, day, period, timetable, department) {
//     // Check if the subject is a Lab
//     if (subject.subjectType === 'Lab') {
//         // Check if there's room for two consecutive slots for the Lab
//         if (period < 5 && !timetable[department][day][period] && !timetable[department][day][period + 1]) {
//             return true; // Allow scheduling the Lab in two consecutive slots
//         }
//     } else {
//         // Check if any period on the same day has the same subject scheduled
//         for (let p = 0; p < 6; p++) {
//             if (timetable[department][day][p]?.subject === subject.subjectName) {
//                 return false;
//             }
//         }
//         // Check if the current period is available
//         if (!timetable[department][day][period]) {
//             return true;
//         }
//     }
//     return false;
// }

// // Function to check if a teacher is available at the given day and period across all semesters
// function teacherAvailable(teacherName, day, period, isLab = false) {
//     if (isLab) {
//         // Check availability for two consecutive periods
//         return teacherAvailability[teacherName][day][period] && teacherAvailability[teacherName][day][period + 1];
//     }
//     return teacherAvailability[teacherName][day][period];
// }

// // Function to update teacher availability after assigning a lecture
// function updateTeacherAvailability(teacherName, day, period, isLab = false) {
//     teacherAvailability[teacherName][day][period] = false;
//     if (isLab) {
//         teacherAvailability[teacherName][day][period + 1] = false;
//     }
// }

// // Function to select a teacher based on their availability for the given subject, day, and period
// async function selectTeacher(subjectId, day, period, isLab = false) {
//     try {
//         // Find the teacher assigned to the given subject
//         const assignment = await TheoryAssignment.findOne({ subjectId }).populate('teacherId');

//         if (assignment && assignment.teacherId && Array.isArray(assignment.teacherId)) {
//             const teachers = assignment.teacherId;

//             for (const teacher of teachers) {
//                 // Check if the teacher is available
//                 if (teacherAvailable(teacher.teacherName, day, period, isLab)) {
//                     return teacher;
//                 }
//             }

//             throw new Error('No available teacher found for this subject');
//         } else if (assignment && assignment.teacherId) {
//             const teacher = assignment.teacherId;

//             // Check if the teacher is available
//             if (teacherAvailable(teacher.teacherName, day, period, isLab)) {
//                 return teacher;
//             } else {
//                 throw new Error(`Teacher ${teacher.teacherName} is not available on day ${day} period ${period}`);
//             }
//         } else {
//             throw new Error('No teacher assigned to this subject');
//         }
//     } catch (error) {
//         console.error('Error selecting teacher:', error);
//         throw error;
//     }
// }

// // Function to generate timetable for a single semester
// async function generateTimetableForSemester(semester) {
//     try {
//         // Initialize timetable matrix for both departments
//         const timetable = {
//             "Computer-A": Array.from({ length: 6 }, () => Array(6).fill(null)),
//             "Computer-B": Array.from({ length: 6 }, () => Array(6).fill(null))
//         };

//         // Fetch subjects for both departments in the semester
//         const subjectsA = await Subject.find({ department: "Computer-A", semester });
//         const subjectsB = await Subject.find({ department: "Computer-B", semester });

//         // Merge subjects from both departments and remove duplicates (for electives)
//         const subjects = [...subjectsA, ...subjectsB.filter(subjectB => !subjectsA.find(subjectA => subjectA.subjectName === subjectB.subjectName))];

//         for (const subject of subjects) {
//             let lecturesScheduled = 0;
//             const shuffledDays = shuffle([0, 1, 2, 3, 4, 5]); // Monday to Saturday

//             for (const day of shuffledDays) {
//                 let labScheduledToday = false;
//                 for (let period = 0; period < 6; period++) {
//                     if (subject.subjectType === 'Lab' && period > 4) {
//                         continue; // Skip if there are no two consecutive slots left for Lab
//                     }

//                     if (subject.subjectType === 'Elective') {
//                         if (!timetable["Computer-A"][day][period] && !timetable["Computer-B"][day][period] &&
//                             canHaveLecture(subject, day, period, timetable, "Computer-A") &&
//                             canHaveLecture(subject, day, period, timetable, "Computer-B")) {
//                             try {
//                                 const teacher = await selectTeacher(subject._id, day, period);
//                                 timetable["Computer-A"][day][period] = { subject: subject.subjectName, teacher: teacher.teacherName };
//                                 timetable["Computer-B"][day][period] = { subject: subject.subjectName, teacher: teacher.teacherName };
//                                 updateTeacherAvailability(teacher.teacherName, day, period);
//                                 lecturesScheduled++;
//                                 if (lecturesScheduled >= subject.lecturesPerWeek) break;
//                             } catch (error) {
//                                 console.error(`No teacher available for subject ${subject.subjectName} on day ${day} period ${period}:, error`);
//                             }
//                         }
//                     } else {
//                         if (!timetable[subject.department][day][period] && canHaveLecture(subject, day, period, timetable, subject.department)) {
//                             try {
//                                 const isLab = subject.subjectType === 'Lab';
//                                 if (isLab && labScheduledToday) {
//                                     continue; // Skip if a Lab is already scheduled for the day
//                                 }

//                                 const teacher = await selectTeacher(subject._id, day, period, isLab);
//                                 timetable[subject.department][day][period] = { subject: subject.subjectName, teacher: teacher.teacherName };
//                                 if (isLab) {
//                                     timetable[subject.department][day][period + 1] = { subject: subject.subjectName, teacher: teacher.teacherName };
//                                     labScheduledToday = true;
//                                 }
//                                 updateTeacherAvailability(teacher.teacherName, day, period, isLab);
//                                 lecturesScheduled++;
//                                 if (isLab) lecturesScheduled++; // Count both slots for Lab
//                                 if (lecturesScheduled >= (isLab ? subject.labsPerWeek : subject.lecturesPerWeek)) break;
//                             } catch (error) {
//                                 console.error(`No teacher available for subject ${subject.subjectName} on day ${day} period ${period}:, error`);
//                             }
//                         }
//                     }
//                 }
//                 if (lecturesScheduled >= (subject.subjectType === 'Lab' ? subject.labsPerWeek : subject.lecturesPerWeek)) break;
//             }
//         }

//         return timetable;
//     } catch (error) {
//         console.error("Error generating timetable for semester:", error);
//         throw error;
//     }
// }

// // Function to generate timetables for all semesters
// exports.generateTimetableForAllSemesters = async (req, res) => {
//     try {
//         const allTimetables = [];
//         const semesters = ["I", "II", "III", "IV", "V", "VI"];

//         await initializeTeacherAvailability();

//         for (const semester of semesters) {
//             const timetable = await generateTimetableForSemester(semester);
//             allTimetables.push({ semester, timetable });
//         }

//         return res.json({ timetable: allTimetables });
//     } catch (error) {
//         console.error("Error generating timetables for all semesters:", error);
//         throw error;
//     }
// }





// fuully functional 2

// const Subject = require('../models/subjectModel');
// const Teacher = require('../models/teacherModel');
// const TheoryAssignment = require('../models/assignSubjectsModel');

// // Function to shuffle an array
// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// // Initialize teacher availability object
// const teacherAvailability = {};

// // Function to initialize teacher availability
// async function initializeTeacherAvailability() {
//     const teachers = await Teacher.find();
//     for (const teacher of teachers) {
//         if (!teacherAvailability[teacher.teacherName]) {
//             teacherAvailability[teacher.teacherName] = Array.from({ length: 6 }, () => Array(6).fill(true));
//         }
//     }
// }

// function canHaveLecture(subject, day, period, timetable, department) {
//     // Check if the subject is a Lab
//     if (subject.subjectType === 'Lab') {
//         // Check if there's room for two consecutive slots for the Lab
//         if (period < 5 && !timetable[department][day][period] && !timetable[department][day][period + 1]) {
//             return true; // Allow scheduling the Lab in two consecutive slots
//         }
//     } else {
//         // Check if any period on the same day has the same subject scheduled
//         for (let p = 0; p < 6; p++) {
//             if (timetable[department][day][p]?.subject === subject.subjectName) {
//                 return false;
//             }
//         }
//         // Check if the current period is available
//         if (!timetable[department][day][period]) {
//             return true;
//         }
//     }
//     return false;
// }

// // Function to check if a teacher is available at the given day and period across all semesters
// function teacherAvailable(teacherName, day, period, isLab = false) {
//     if (isLab) {
//         // Check availability for two consecutive periods
//         return teacherAvailability[teacherName][day][period] && teacherAvailability[teacherName][day][period + 1];
//     }
//     return teacherAvailability[teacherName][day][period];
// }

// // Function to update teacher availability after assigning a lecture
// function updateTeacherAvailability(teacherName, day, period, isLab = false) {
//     teacherAvailability[teacherName][day][period] = false;
//     if (isLab) {
//         teacherAvailability[teacherName][day][period + 1] = false;
//     }
// }

// // Function to select a teacher based on their availability for the given subject, day, and period
// async function selectTeacher(subjectId, day, period, isLab = false) {
//     try {
//         // Find the teacher assigned to the given subject
//         const assignment = await TheoryAssignment.findOne({ subjectId }).populate('teacherId');

//         if (assignment && assignment.teacherId && Array.isArray(assignment.teacherId)) {
//             const teachers = assignment.teacherId;

//             for (const teacher of teachers) {
//                 // Check if the teacher is available
//                 if (teacherAvailable(teacher.teacherName, day, period, isLab)) {
//                     return teacher;
//                 }
//             }

//             throw new Error('No available teacher found for this subject');
//         } else if (assignment && assignment.teacherId) {
//             const teacher = assignment.teacherId;

//             // Check if the teacher is available
//             if (teacherAvailable(teacher.teacherName, day, period, isLab)) {
//                 return teacher;
//             } else {
//                 throw new Error(`Teacher ${teacher.teacherName} is not available on day ${day} period ${period}`);
//             }
//         } else {
//             throw new Error('No teacher assigned to this subject');
//         }
//     } catch (error) {
//         console.error('Error selecting teacher:', error);
//         throw error;
//     }
// }

// // Function to generate timetable for a single semester and department
// async function generateTimetableForDepartment(semester, department) {
//     try {
//         // Initialize timetable matrix for the department
//         const timetable = Array.from({ length: 6 }, () => Array(6).fill(null));

//         // Fetch subjects for the department in the semester
//         const subjects = await Subject.find({ department, semester });

//         // Group subjects by subjectName
//         const subjectsMap = {};
//         subjects.forEach(subject => {
//             if (!subjectsMap[subject.subjectName]) {
//                 subjectsMap[subject.subjectName] = [];
//             }
//             subjectsMap[subject.subjectName].push(subject);
//         });

//         // Iterate over each subject group
//         for (const subjectName in subjectsMap) {
//             const subjectGroup = subjectsMap[subjectName];
//             let lecturesScheduled = 0;

//             // Shuffle days for fairness
//             const shuffledDays = shuffle([0, 1, 2, 3, 4, 5]); // Monday to Saturday

//             for (const day of shuffledDays) {
//                 let labScheduledToday = false;

//                 // Iterate over each period of the day
//                 for (let period = 0; period < 6; period++) {
//                     if (subjectGroup[0].subjectType === 'Lab' && period > 4) {
//                         continue; // Skip if there are no two consecutive slots left for Lab
//                     }

//                     for (const subject of subjectGroup) {
//                         if (canHaveLecture(subject, day, period, { [department]: timetable }, department)) {
//                             try {
//                                 const isLab = subject.subjectType === 'Lab';
//                                 if (isLab && labScheduledToday) {
//                                     continue; // Skip if a Lab is already scheduled for the day
//                                 }

//                                 const teacher = await selectTeacher(subject._id, day, period, isLab);
//                                 timetable[day][period] = { subject: subject.subjectName, teacher: teacher.teacherName };
//                                 if (isLab) {
//                                     timetable[day][period + 1] = { subject: subject.subjectName, teacher: teacher.teacherName };
//                                     labScheduledToday = true;
//                                 }
//                                 updateTeacherAvailability(teacher.teacherName, day, period, isLab);
//                                 lecturesScheduled++;
//                                 if (isLab) lecturesScheduled++; // Count both slots for Lab
//                                 if (lecturesScheduled >= (isLab ? subject.labsPerWeek : subject.lecturesPerWeek)) break;
//                             } catch (error) {
//                                 console.error(`No teacher available for subject ${subject.subjectName} on day ${day} period ${period}:`, error);
//                             }
//                         }
//                     }
//                     if (lecturesScheduled >= (subjectGroup[0].subjectType === 'Lab' ? subjectGroup[0].labsPerWeek : subjectGroup[0].lecturesPerWeek)) break;
//                 }
//                 if (lecturesScheduled >= (subjectGroup[0].subjectType === 'Lab' ? subjectGroup[0].labsPerWeek : subjectGroup[0].lecturesPerWeek)) break;
//             }
//         }

//         return timetable;
//     } catch (error) {
//         console.error("Error generating timetable for semester and department:", error);
//         throw error;
//     }
// }

// // Function to generate timetables for all semesters
// exports.generateTimetableForAllSemesters = async (req, res) => {
//     try {
//         const allTimetables = [];
//         const semesters = ["I", "II", "III", "IV", "V", "VI"];
//         const departments = ["Computer-A", "Computer-B"]; // Add other departments as needed

//         await initializeTeacherAvailability();

//         for (const semester of semesters) {
//             for (const department of departments) {
//                 const timetable = await generateTimetableForDepartment(semester, department);
//                 allTimetables.push({ semester, department, timetable });
//             }
//         }

//         return res.json({ timetable: allTimetables });
//     } catch (error) {
//         console.error("Error generating timetables for all semesters and departments:", error);
//         res.status(500).json({ error: error.message });
//     }
// }






//..........................................................................,,,,,,,........................................//
const Subject = require('../models/subjectModel');
const Teacher = require('../models/teacherModel');
const TheoryAssignment = require('../models/assignSubjectsModel');

// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize teacher availability object
const teacherAvailability = {};

// Function to initialize teacher availability
async function initializeTeacherAvailability() {
    const teachers = await Teacher.find();
    for (const teacher of teachers) {
        if (!teacherAvailability[teacher.teacherName]) {
            teacherAvailability[teacher.teacherName] = Array.from({ length: 6 }, () => Array(6).fill(true));
        }
    }
}

function canHaveLecture(subject, day, period, timetable, department) {
    // Check if the subject is a Lab
    if (subject.subjectType === 'Lab') {
        // Check if there's room for two consecutive slots for the Lab
        if (period < 5 && !timetable[department][day][period] && !timetable[department][day][period + 1]) {
            return true; // Allow scheduling the Lab in two consecutive slots
        }
    } else {
        // Check if any period on the same day has the same subject scheduled
        for (let p = 0; p < 6; p++) {
            if (timetable[department][day][p]?.subject === subject.subjectName) {
                return false;
            }
        }
        // Check if the current period is available
        if (!timetable[department][day][period]) {
            return true;
        }
    }
    return false;
}

// Function to check if a teacher is available at the given day and period across all semesters
function teacherAvailable(teacherName, day, period, isLab = false) {
    if (isLab) {
        // Check availability for two consecutive periods
        return teacherAvailability[teacherName][day][period] && teacherAvailability[teacherName][day][period + 1];
    }
    return teacherAvailability[teacherName][day][period];
}

// Function to update teacher availability after assigning a lecture
function updateTeacherAvailability(teacherName, day, period, isLab = false) {
    teacherAvailability[teacherName][day][period] = false;
    if (isLab) {
        teacherAvailability[teacherName][day][period + 1] = false;
    }
}

// Function to select a teacher based on their availability for the given subject, day, and period
async function selectTeacher(subjectId, day, period, isLab = false) {
    try {
        // Find the teacher assigned to the given subject
        const assignment = await TheoryAssignment.findOne({ subjectId }).populate('teacherId');

        if (assignment && assignment.teacherId && Array.isArray(assignment.teacherId)) {
            const teachers = assignment.teacherId;

            for (const teacher of teachers) {
                // Check if the teacher is available
                if (teacherAvailable(teacher.teacherName, day, period, isLab)) {
                    return teacher;
                }
            }

            throw new Error('No available teacher found for this subject');
        } else if (assignment && assignment.teacherId) {
            const teacher = assignment.teacherId;

            // Check if the teacher is available
            if (teacherAvailable(teacher.teacherName, day, period, isLab)) {
                return teacher;
            } else {
                throw new Error(`Teacher ${teacher.teacherName} is not available on day ${day} period ${period}`);
            }
        } else {
            throw new Error('No teacher assigned to this subject');
        }
    } catch (error) {
        console.error('Error selecting teacher:', error);
        throw error;
    }
}

// Function to generate timetable for electives only
async function generateElectiveTimetable(semester) {
    try {
        // Initialize timetable matrix for electives
        const electiveTimetable = Array.from({ length: 6 }, () => Array(6).fill(null));

        // Fetch elective subjects for the semester
        const electives = await Subject.find({ semester, subjectType: 'Elective' });

        // Group electives by subjectName
        const electivesMap = {};
        electives.forEach(subject => {
            if (!electivesMap[subject.subjectName]) {
                electivesMap[subject.subjectName] = [];
            }
            electivesMap[subject.subjectName].push(subject);
        });

        // Iterate over each elective group
        for (const subjectName in electivesMap) {
            const subjectGroup = electivesMap[subjectName];
            let lecturesScheduled = 0;

            // Shuffle days for fairness
            const shuffledDays = shuffle([0, 1, 2, 3, 4, 5]); // Monday to Saturday

            // Shuffle periods for each day
            const shuffledPeriods = shuffle([0, 1, 2, 3, 4, 5]);

            for (const day of shuffledDays) {
                for (const period of shuffledPeriods) {
                    for (const subject of subjectGroup) {
                        if (canHaveLecture(subject, day, period, { elective: electiveTimetable }, 'elective')) {
                            try {
                                const teacher = await selectTeacher(subject._id, day, period);
                                electiveTimetable[day][period] = { subject: subject.subjectName, teacher: teacher.teacherName };
                                updateTeacherAvailability(teacher.teacherName, day, period);
                                lecturesScheduled++;
                                if (lecturesScheduled >= subject.lecturesPerWeek) break;
                            } catch (error) {
                                console.error(`No teacher available for elective subject ${subject.subjectName} on day ${day} period ${period}:`, error);
                            }
                        }
                    }
                    if (lecturesScheduled >= subjectGroup[0].lecturesPerWeek) break;
                }
                if (lecturesScheduled >= subjectGroup[0].lecturesPerWeek) break;
            }
        }

        return electiveTimetable;
    } catch (error) {
        console.error("Error generating timetable for electives:", error);
        throw error;
    }
}

// Function to generate timetable for a single semester and department with elective slots pre-filled
async function generateTimetableForDepartment(semester, department, electiveTimetable) {
    try {
        // Initialize timetable matrix for the department
        const timetable = Array.from({ length: 6 }, () => Array(6).fill(null));

        // Fill elective slots in the timetable
        for (let day = 0; day < 6; day++) {
            for (let period = 0; period < 6; period++) {
                if (electiveTimetable[day][period]) {
                    timetable[day][period] = electiveTimetable[day][period];
                }
            }
        }

        // Fetch non-elective subjects for the department in the semester
        const subjects = await Subject.find({ department, semester, subjectType: { $ne: 'Elective' } });

        // Group subjects by subjectName
        const subjectsMap = {};
        subjects.forEach(subject => {
            if (!subjectsMap[subject.subjectName]) {
                subjectsMap[subject.subjectName] = [];
            }
            subjectsMap[subject.subjectName].push(subject);
        });

        // Iterate over each subject group
        for (const subjectName in subjectsMap) {
            const subjectGroup = subjectsMap[subjectName];
            let lecturesScheduled = 0;

            // Shuffle days for fairness
            const shuffledDays = shuffle([0, 1, 2, 3, 4, 5]); // Monday to Saturday

            for (const day of shuffledDays) {
                let labScheduledToday = false;

                // Iterate over each period of the day, ensuring no gaps
                for (let period = 0; period < 6; period++) {
                    if (subjectGroup[0].subjectType === 'Lab' && period > 4) {
                        continue; // Skip if there are no two consecutive slots left for Lab
                    }

                    // Ensure no gaps by only scheduling if previous period is filled or it's the first period
                    if (period > 0 && !timetable[day][period - 1] && timetable[day][period] == null) continue;

                    for (const subject of subjectGroup) {
                        if (!timetable[day][period] && canHaveLecture(subject, day, period, { [department]: timetable }, department)) {
                            try {
                                const isLab = subject.subjectType === 'Lab';
                                if (isLab && labScheduledToday) {
                                    continue; // Skip if a Lab is already scheduled for the day
                                }

                                const teacher = await selectTeacher(subject._id, day, period, isLab);
                                timetable[day][period] = { subject: subject.subjectName, teacher: teacher.teacherName };
                                if (isLab) {
                                    timetable[day][period + 1] = { subject: subject.subjectName, teacher: teacher.teacherName };
                                    labScheduledToday = true;
                                }
                                updateTeacherAvailability(teacher.teacherName, day, period, isLab);
                                lecturesScheduled++;
                                if (isLab) lecturesScheduled++; // Count both slots for Lab
                                if (lecturesScheduled >= (isLab ? subject.labsPerWeek : subject.lecturesPerWeek)) break;
                            } catch (error) {
                                console.error(`No teacher available for subject ${subject.subjectName} on day ${day} period ${period}:`, error);
                            }
                        }
                    }
                    if (lecturesScheduled >= (subjectGroup[0].subjectType === 'Lab' ? subjectGroup[0].labsPerWeek : subjectGroup[0].lecturesPerWeek)) break;
                }
                if (lecturesScheduled >= (subjectGroup[0].subjectType === 'Lab' ? subjectGroup[0].labsPerWeek : subjectGroup[0].lecturesPerWeek)) break;
            }
        }

        return timetable;
    } catch (error) {
        console.error("Error generating timetable for semester and department:", error);
        throw error;
    }
}

// Function to generate timetables for all semesters
exports.generateTimetableForAllSemesters = async (req, res) => {
    try {
        const allTimetables = [];
        const semesters = ["I", "II", "III", "IV", "V", "VI"];
        const departments = ["Computer-A", "Computer-B"]; // Add other departments as needed

        await initializeTeacherAvailability();

        for (const semester of semesters) {
            const electiveTimetable = await generateElectiveTimetable(semester);

            for (const department of departments) {
                const timetable = await generateTimetableForDepartment(semester, department, electiveTimetable);
                allTimetables.push({ semester, department, timetable });
            }
        }

        return res.json({ timetable: allTimetables });
    } catch (error) {
        console.error("Error generating timetables for all semesters and departments:", error);
        res.status(500).json({ error: error.message });
    }
}



// const Subject = require('../models/subjectModel');
// const Teacher = require('../models/teacherModel');
// const TheoryAssignment = require('../models/assignSubjectsModel');

// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// const teacherAvailability = {};

// async function initializeTeacherAvailability() {
//     const teachers = await Teacher.find();
//     for (const teacher of teachers) {
//         if (!teacherAvailability[teacher.teacherName]) {
//             teacherAvailability[teacher.teacherName] = Array.from({ length: 6 }, () => Array(6).fill(true));
//         }
//     }
// }

// function canHaveLecture(subject, day, period, timetable, department) {
//     if (subject.subjectType === 'Lab') {
//         if (period < 5 && !timetable[department][day][period] && !timetable[department][day][period + 1]) {
//             return true;
//         }
//     } else {
//         for (let p = 0; p < 6; p++) {
//             if (timetable[department][day][p]?.subject === subject.subjectName) {
//                 return false;
//             }
//         }
//         if (!timetable[department][day][period]) {
//             return true;
//         }
//     }
//     return false;
// }

// // Function to check if a teacher is available at the given day and period across all semesters
// function teacherAvailable(teacherName, day, period, isLab = false) {
//     if (isLab) {
//         return teacherAvailability[teacherName][day][period] && teacherAvailability[teacherName][day][period + 1];
//     }
//     return teacherAvailability[teacherName][day][period];
// }

// function updateTeacherAvailability(teacherName, day, period, isLab = false) {
//     teacherAvailability[teacherName][day][period] = false;
//     if (isLab) {
//         teacherAvailability[teacherName][day][period + 1] = false;
//     }
// }

// // Function to select a teacher based on their availability for the given subject, day, and period
// async function selectTeacher(subjectId, day, period, isLab = false) {
//     try {
//         const assignment = await TheoryAssignment.findOne({ subjectId }).populate('teacherId');

//         if (assignment && assignment.teacherId && Array.isArray(assignment.teacherId)) {
//             const teachers = assignment.teacherId;

//             for (const teacher of teachers) {
//                 if (teacherAvailable(teacher.teacherName, day, period, isLab)) {
//                     return teacher;
//                 }
//             }

//             throw new Error('No available teacher found for this subject');
//         } else if (assignment && assignment.teacherId) {
//             const teacher = assignment.teacherId;

//             if (teacherAvailable(teacher.teacherName, day, period, isLab)) {
//                 return teacher;
//             } else {
//                 throw new Error(`Teacher ${teacher.teacherName} is not available on day ${day} period ${period}`);
//             }
//         } else {
//             throw new Error('No teacher assigned to this subject');
//         }
//     } catch (error) {
//         console.error('Error selecting teacher:', error);
//         throw error;
//     }
// }

// // Function to generate timetable for electives only
// async function generateElectiveTimetable(semester) {
//     try {
//         const electiveTimetable = Array.from({ length: 6 }, () => Array(6).fill(null));

//         const electives = await Subject.find({ semester, subjectType: 'Elective' });

//         const electivesMap = {};
//         electives.forEach(subject => {
//             if (!electivesMap[subject.subjectName]) {
//                 electivesMap[subject.subjectName] = [];
//             }
//             electivesMap[subject.subjectName].push(subject);
//         });

//         for (const subjectName in electivesMap) {
//             const subjectGroup = electivesMap[subjectName];
//             let lecturesScheduled = 0;

//             const shuffledDays = shuffle([0, 1, 2, 3, 4, 5]); // Monday to Saturday

//             const shuffledPeriods = shuffle([0, 1, 2, 3, 4, 5]);

//             for (const day of shuffledDays) {
//                 for (const period of shuffledPeriods) {
//                     for (const subject of subjectGroup) {
//                         if (canHaveLecture(subject, day, period, { elective: electiveTimetable }, 'elective')) {
//                             try {
//                                 const teacher = await selectTeacher(subject._id, day, period);
//                                 electiveTimetable[day][period] = { subject: subject.subjectName, teacher: teacher.teacherName };
//                                 updateTeacherAvailability(teacher.teacherName, day, period);
//                                 lecturesScheduled++;
//                                 if (lecturesScheduled >= subject.lecturesPerWeek) break;
//                             } catch (error) {
//                                 console.error(`No teacher available for elective subject ${subject.subjectName} on day ${day} period ${period}:`, error);
//                             }
//                         }
//                     }
//                     if (lecturesScheduled >= subjectGroup[0].lecturesPerWeek) break;
//                 }
//                 if (lecturesScheduled >= subjectGroup[0].lecturesPerWeek) break;
//             }
//         }

//         return electiveTimetable;
//     } catch (error) {
//         console.error("Error generating timetable for electives:", error);
//         throw error;
//     }
// }

// // Function to generate timetable for a single semester and department with elective slots pre-filled
// async function generateTimetableForDepartment(semester, department, electiveTimetable) {
//     try {
//         const timetable = Array.from({ length: 6 }, () => Array(6).fill(null));

//         for (let day = 0; day < 6; day++) {
//             for (let period = 0; period < 6; period++) {
//                 if (electiveTimetable[day][period]) {
//                     timetable[day][period] = electiveTimetable[day][period];
//                 }
//             }
//         }

//         // Fetch non-elective subjects for the department in the semester
//         const subjects = await Subject.find({ department, semester, subjectType: { $ne: 'Elective' } });

//         const subjectsMap = {};
//         subjects.forEach(subject => {
//             if (!subjectsMap[subject.subjectName]) {
//                 subjectsMap[subject.subjectName] = [];
//             }
//             subjectsMap[subject.subjectName].push(subject);
//         });

//         const totalLectures = subjects.reduce((total, subject) => total + subject.lecturesPerWeek, 0);
//         const lecturesPerDay = Math.ceil(totalLectures / 6);

//         for (const subjectName in subjectsMap) {
//             const subjectGroup = subjectsMap[subjectName];
//             let lecturesScheduled = 0;

//             const shuffledDays = shuffle([0, 1, 2, 3, 4, 5]); // Monday to Saturday

//             for (const day of shuffledDays) {
//                 let labScheduledToday = false;
//                 let remainingLectures = lecturesPerDay;

//                 // Iterate over each period of the day, ensuring no gaps
//                 for (let period = 0; period < 6; period++) {
//                     if (subjectGroup[0].subjectType === 'Lab' && period > 4) {
//                         continue; // Skip if there are no two consecutive slots left for Lab
//                     }

//                     if (period > 0 && !timetable[day][period - 1] && timetable[day][period] == null) continue;

//                     for (const subject of subjectGroup) {
//                         if (!timetable[day][period] && canHaveLecture(subject, day, period, { [department]: timetable }, department)) {
//                             try {
//                                 const isLab = subject.subjectType === 'Lab';
//                                 if (isLab && labScheduledToday) {
//                                     continue; // Skip if a Lab is already scheduled for the day
//                                 }

//                                 const teacher = await selectTeacher(subject._id, day, period, isLab);
//                                 timetable[day][period] = { subject: subject.subjectName, teacher: teacher.teacherName };
//                                 if (isLab) {
//                                     timetable[day][period + 1] = { subject: subject.subjectName, teacher: teacher.teacherName };
//                                     labScheduledToday = true;
//                                 }
//                                 updateTeacherAvailability(teacher.teacherName, day, period, isLab);
//                                 lecturesScheduled++;
//                                 remainingLectures--;
//                                 if (isLab) {
//                                     lecturesScheduled++; // Count both slots for Lab
//                                     remainingLectures--;
//                                 }
//                                 if (remainingLectures <= 0) break;
//                             } catch (error) {
//                                 console.error(`No teacher available for subject ${subject.subjectName} on day ${day} period ${period}:`, error);
//                             }
//                         }
//                     }
//                     if (remainingLectures <= 0) break;
//                 }
//                 if (remainingLectures <= 0) break;
//             }
//         }

//         return timetable;
//     } catch (error) {
//         console.error("Error generating timetable for semester and department:", error);
//         throw error;
//     }
// }

// // Function to generate timetables for all semesters
// exports.generateTimetableForAllSemesters = async (req, res) => {
//     try {
//         const allTimetables = [];
//         const semesters = ["I", "II", "III", "IV", "V", "VI"];
//         const departments = ["Computer-A", "Computer-B"];

//         await initializeTeacherAvailability();

//         for (const semester of semesters) {
//             const electiveTimetable = await generateElectiveTimetable(semester);

//             for (const department of departments) {
//                 const timetable = await generateTimetableForDepartment(semester, department, electiveTimetable);
//                 allTimetables.push({ semester, department, timetable });
//             }
//         }

//         return res.json({ timetable: allTimetables });
//     } catch (error) {
//         console.error("Error generating timetables for all semesters and departments:", error);
//         res.status(500).json({ error: error.message });
//     }
// }


