import React from 'react';
import FeatureCard from '../Components/FeatureCard';
 import { faClock, faExclamationTriangle, faFileExport, faChalkboard, faBrain, faChartBar } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
    return (
        <section className="container py-5"> 
            <h2 className="text-center mb-5" style={{ fontWeight: "bold", fontSize: "40px", color: '#5c3bcc', fontFamily:"Roboto" }}>Features</h2>
            <div className="row">
                
                <FeatureCard
                    icon={faClock}
                    title="One-Click Timetable Generation"
                    description="Generate a complete timetable with just one click, saving time and effort."
                    color="primary"
                />
                <FeatureCard
                    icon={faExclamationTriangle}
                    title="Conflict Detection"
                    description="Automatically detect and highlight any conflicts in the timetable, such as overlapping classes."
                    color="warning"
                />
                <FeatureCard
                    icon={faFileExport}
                    title="Export and Print"
                    description="Easily export the generated timetable to various formats and print it for offline use."
                    color="success"
                />
                <FeatureCard
                    icon={faChalkboard}
                    title="Automatic Class Assignment"
                    description="Efficiently assign subjects to available classrooms based on predefined criteria."
                    color="info"
                />
                <FeatureCard
                    icon={faBrain}
                    title="Smart Timetable Optimization"
                    description="Optimize the timetable using intelligent algorithms based on teacher preferences, room capacity, and student distribution."
                    color="danger"
                />
                <FeatureCard
                    icon={faChartBar}
                    title="Interactive Dashboard"
                    description="View and manage the timetable through an intuitive dashboard, allowing real-time adjustments and visualization of key metrics."
                    color="primary"
                />
            </div>
        </section>
    );
};

export default Features;
