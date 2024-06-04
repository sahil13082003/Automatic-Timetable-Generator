import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function StepCard({ stepNumber, title, description, icon, image }) {
    return (
        <div className="d-flex col-md-12 mb-3">
            <div className="card text-center border-1 shadow-lg p-4 rounded">
                <div className="card-body">
                    <h5 className="card-title mb-4">Step {stepNumber}</h5>
                    {icon && <FontAwesomeIcon icon={icon} size="3x" className="mb-4" color="#5c3bcc" />}
                    <h6 className="card-subtitle mb-2">{title}</h6>
                    <p className="card-text">{description}</p>
                    {image && <img src={image} alt={`Step ${stepNumber}`} className="img-fluid mt-3 mb-3" />}
                    <FontAwesomeIcon icon={faArrowRight} size="2x" color="#5c3bcc" />
                </div>
            </div>
        </div>
    );
}

export default StepCard;
