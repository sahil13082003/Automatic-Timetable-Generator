import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeatureCard = ({ icon, title, description, color }) => {
    return (
        <div className="col-md-4 mb-5">
            <div className="card h-100 shadow-sm rounded">
                <div className="card-body text-center">
                    <FontAwesomeIcon icon={icon} size="3x" className={`mb-3 text-${color}`} />
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;
