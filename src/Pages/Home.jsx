import HomePageImage from '../Images/HomePage.png';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './About';
import Features from './Features';
import Footer from './Footer';

export default function Home() {
    const navigate = useNavigate();

    const handleGenerateTimetable = () => {
        const isLoggedIn = localStorage.getItem('username');

        if (isLoggedIn) {
            navigate('/generate');
        } else {
            toast.error('Please login first to generate a timetable.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div>
            <section id="HomePage" className="HomePage container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-8 offset-md-2 mb-4 mb-md-0">
                        <div className="Home_content">
                            <div className="Home_header">
                                <h4 className="Home_heading">
                                    <span>Automatic <span style={{ color: "#5c3bcc" }}>Timetable</span> </span>
                                    <br />
                                    <span style={{ color: "#5c3bcc" }}>Generator</span>
                                </h4>
                                <p className="description">
                                    Here's your solution for managing schedules effortlessly. Our Automatic Timetable Generator simplifies the process, allowing you to focus on what truly matters.
                                </p>
                                <br />
                                <button
                                    style={{ fontWeight: "bold", fontSize: "19px" }}
                                    className="btn btn-outline-primary"
                                    onClick={handleGenerateTimetable}
                                >
                                    Generate Timetable
                                </button>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="Home_img">
                            <img src={HomePageImage} alt="Images" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>
            <About/>
            <Features />
            <Footer/>
            <ToastContainer />
        </div>
    );
}
