import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom'; 

import '../styling/Sidenavbar.css';

function SideNavbar() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-auto col-sm-3.2 bg-dark d-flex flex-column justify-content-between min-vh-100">
          <div className="mt-4">
            <Link to="/" className="text-decoration-none ms-4 d-flex align-item-center text-white d-none d-sm-inline" role="button">
              <i className="bi bi-calendar-week fs-4"></i>
              <span className="ms-3 fs-4">SCHEDULER</span>
            </Link>
            <hr className="text-white d-none d-sm-block"></hr>
            <ul className="nav nav-pills flex-column mt-5 " id="menu_item">
              <li className="nav-item my-1 mb-5 py-2 py-sm-0">
                <Link to="/add-subject" className="nav-link text-white text-center text-sm-start" aria-current="page">
                  <i className="bi bi-journal-plus fs-3"></i>
                  <span className='ms-2 d-none d-sm-inline font-weight-bold fs-5'>ADD SUBJECTS</span>
                </Link>
              </li>
              <li className="nav-item text-white my-1 mb-5 py-2 py-sm-0">
                <Link to="/add-teachers" className="nav-link text-white" aria-current="page">
                  <i className="bi bi-person-plus fs-3"></i>
                  <span className='ms-2 d-none d-sm-inline font-weight-bold fs-5'>ADD TEACHERS</span>
                </Link>
              </li>
              <li className="nav-item text-white my-1 mb-5 py-2 py-sm-0">
                <Link to="/add-classrooms" className="nav-link text-white text-center text-sm-start" aria-current="page">
                  <i className="bi bi-door-closed fs-3"></i>
                  <span className='ms-2 d-none d-sm-inline font-weight-bold fs-5'>ADD CLASSROOMS</span>
                </Link>
              </li>
              <li className="nav-item text-white my-1 mb-5 py-2 py-sm-0 dropdown">
                <Link to="/assign" className="nav-link text-white text-center text-sm-start dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-journal-check fs-3"></i>
                  <span className='ms-2 d-none d-sm-inline font-weight-bold fs-4'>ASSIGN</span>
                </Link>
                <ul className="dropdown-menu bg-light" aria-labelledby="navbarDropdown" style={{ left: 'auto', right: 0 }}>
                  <li><Link to="/assign-theory" className="dropdown-item"><i className="bi bi-book fs-3"></i> Assign Theory Subjects</Link></li>
                  <li><Link to="/assign-lab" className="dropdown-item"><i className="bi bi-door-closed fs-3"></i> Assign Lab Subjects</Link></li>
                  <li><Link to="/assign-elective" className="dropdown-item"><i className="bi bi-lightning fs-3"></i> Assign Elective Subjects</Link></li>
                  <li><Link to="/assign-rooms" className="dropdown-item"><i className="bi bi-door-closed fs-3"></i> Assign Rooms</Link></li>
                </ul>
              </li>
              <li className="nav-item text-white my-1 mb-5 py-2 py-sm-0">
                <Link to="/generate-timetable" className="nav-link text-white text-center text-sm-start" aria-current="page">
                  <i className="bi bi-calendar-week fs-3"></i>
                  <span className='ms-2 d-none d-sm-inline font-weight-bold fs-5'>GENERATE TIMETABLE</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;
