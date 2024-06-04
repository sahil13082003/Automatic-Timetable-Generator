import React from 'react';
import StepCard from '../Components/StepCard';
import { faUser, faBook, faUniversity, faCheck, faTasks } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    return (
        <section className="container py-5">
            <h1 className="text-center mb-5" style={{ fontWeight: "bold", fontSize: "35px", color: '#5c3bcc', fontFamily:"Roboto" }}>How to Use..?</h1>
            <div className="row">
                <div className="col-md-4">
                    <StepCard
                        stepNumber={1}
                        title="Add Teachers"
                        description="Add a new teacher . Add a new teacher .Add a new teacher . Add a new teacher ."
                        icon={faUser}
                    />
                </div>
                <div className="col-md-4">
                    <StepCard
                        stepNumber={2}
                        title="Add Subjects"
                        description="Add a subject with proper subject type (theory, lab, elective)."
                        icon={faBook}
                    />
                </div>
                <div className="col-md-4">
                    <StepCard
                        stepNumber={3}
                        title="Add Classrooms"
                        description="Add a new classroom. Add a new classroom. Add a new classroom.Add a new classroom."
                        icon={faUniversity}
                    />
                </div>
            </div>
            <div className="row">
            <div className="col-md-4">
                    <StepCard
                        stepNumber={4}
                        title="Assign Classes to Students" 
                        description="Assign a registered classroom to students. Assign a registered classroom to students. "
                        icon={faTasks}
                    />
                </div>
               
                <div className="col-md-4">
                    <StepCard
                        stepNumber={5}
                        title="Click on Generate"
                        description="Click 'Generate Timetable' to generate a timetable with proper constraints."
                        icon={faCheck}
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
