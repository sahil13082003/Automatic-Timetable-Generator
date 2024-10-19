import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../Images/logo.png';
import '../styling/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username'));

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
    }, [localStorage.getItem('username')]);

    const handleLogout = () => {
        confirmAlert({
            title: 'Confirm Logout',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        localStorage.removeItem('username');
                        setUsername(null);
                        toast.success('You are logged out successfully!', {
                            position: 'top-right',
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        navigate('/');
                    },
                },
                {
                    label: 'No',
                    onClick: () => { }, // Do nothing
                },
            ],
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ boxShadow: '0 5px 19px rgba(69, 68, 72, 0.4)' }}>
            <div className="container-fluid m-1">
                <Link className="navbar-brand offset-md-0" to="/">
                    <img src={logoImage} alt="Logo" style={{ width: '200px', height: 'auto' }} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link m-4" to="/" style={{ fontWeight: 'bold', fontSize: '25px', color: '#5c3bcc' }}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link m-4" to="/about" style={{ fontWeight: 'bold', fontSize: '25px', color: '#5c3bcc' }}>
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link m-4" to="/help" style={{ fontWeight: 'bold', fontSize: '25px', color: '#5c3bcc' }}>
                                Help
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    {username ? (
                        <div className="dropdown">
                            <button
                                className="btn btn-outline-primary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                onClick={toggleDropdown}
                                style={{ fontWeight: 'bold', fontSize: '20px' }}
                            >
                                {username}
                            </button>
                            <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                                <li>
                                    <Link className="dropdown-item" to="/">
                                        {username}
                                    </Link>
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Log out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link className="btn" to="/signIn" style={{ fontWeight: 'bold', fontSize: '24px' }}>
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
