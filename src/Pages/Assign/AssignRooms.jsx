import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNavbar from '../../Components/SideNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AssignClassrooms() {
    const [classrooms, setClassrooms] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchClassrooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/fetchclassroom');
                setClassrooms(response.data.data);
            } catch (error) {
                console.error('Error fetching classrooms:', error);
            }
        };

        fetchClassrooms();
    }, []);

    useEffect(() => {
        if (selectedCourse === 'computer') {
            setSections(['A', 'B']);
        } else {
            setSections([]);
        }
    }, [selectedCourse]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/fetchclassrooms');
                setAssignments(response.data.data);
            } catch (error) {
                console.error('Error fetching classroom assignments:', error);
            }
        };

        fetchAssignments();
    }, []);

    const handleAssign = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/assignclassrooms', {
                course: selectedCourse,
                year: selectedYear,
                section: selectedSection,
                classroom: selectedClassroom.classroomName
            });
            toast.success('Classroom assigned successfully');
            const response = await axios.get('http://localhost:5000/api/fetchclassrooms');
            setAssignments(response.data.data);
        } catch (error) {
            console.error('Error assigning classroom:', error);
        }
    };

    const handleDelete = async (assignmentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/removeclassroom/${assignmentId}`);
            toast.success('Assignment deleted successfully');
            const response = await axios.get('http://localhost:5000/api/fetchclassrooms');
            setAssignments(response.data.data);
        } catch (error) {
            console.error('Error deleting assignment:', error);
        }
    };


    const courses = [
        { id: 'computer', name: 'Computer' },
        { id: 'mechanical', name: 'Mechanical' },
        { id: 'electrical', name: 'Electrical' },
        { id: 'civil', name: 'Civil' },
    ];

    const years = ['2nd', '3rd', '4th'];

    // Filter assigned classrooms based on selected course, year, and section
    const filteredClassrooms = classrooms.filter(classroom => {
        // Check if the current classroom is not already assigned
        return !assignments.some(assignment =>
            assignment.classroom === classroom.classroomName
        );
    });


    return (
        <>
            <ToastContainer />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-auto col-sm-3.2 bg-dark d-flex flex-column justify-content-between min-vh-100">
                        <SideNavbar />
                    </div>
                    <div className="col">
                        <h1 className="text-center mt-5 mb-4 custom-heading">Assign Classrooms</h1>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="course" className="form-label custom-label">Choose Course:</label>
                                <select id="course" className="form-select custom-select" onChange={(e) => setSelectedCourse(e.target.value)}>
                                    <option value="">Select Course</option>
                                    {courses.map(course => (
                                        <option key={course.id} value={course.id}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                <label htmlFor="year" className="form-label custom-label">Select Year:</label>
                                <select id="year" className="form-select custom-select" onChange={(e) => setSelectedYear(e.target.value)}>
                                    <option value="">Select Year</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year} Year</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-4 mb-3">
                                {selectedCourse === 'computer' && (
                                    <div>
                                        <label htmlFor="section" className="form-label custom-label">Select Section:</label>
                                        <select id="section" className="form-select custom-select" onChange={(e) => setSelectedSection(e.target.value)}>
                                            <option value="">Select Section</option>
                                            {sections.map(section => (
                                                <option key={section} value={section}>{section}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 mb-3">
                                <label htmlFor="classroom" className="form-label custom-label">Choose Classroom:</label>
                                <select id="classroom" className="form-select custom-select" onChange={(e) => setSelectedClassroom(JSON.parse(e.target.value))}>
                                    <option value="">Select Classroom</option>
                                    {filteredClassrooms.map(classroom => (
                                        <option key={classroom._id} value={JSON.stringify(classroom)}>
                                            {classroom.classroomName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-primary" onClick={handleAssign}>Assign</button>
                            </div>
                        </div>
                        <div className="container-fluid mt-5">
                            <div className="row">
                                <div className="col">
                                    <h2 className="text-center">Assigned Classrooms</h2>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Course</th>
                                                <th>Year</th>
                                                <th>Section</th>
                                                <th>Classroom</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {assignments.map((item, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                                                    <td>{item.course}</td>
                                                    <td>{item.year}</td>
                                                    <td>{item.section}</td>
                                                    <td>{item.classroom}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AssignClassrooms;
