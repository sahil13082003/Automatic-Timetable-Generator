import React, { useState, useEffect } from "react";
import SideNavbar from "../../Components/SideNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddRooms() {

  const [refereshToken, setRefereshToken] = useState(null);

  const [classrooms, setClassrooms] = useState([]);

  const [formData, setFormData] = useState({
    classroomName: ""
  });

  useEffect(() => {
    fetchClassroom();
  }, [refereshToken]);

  const fetchClassroom = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/fetchClassroom");
      setClassrooms(response?.data.data);
    } catch (error) {
      toast.error("Error fetching classroom:", error);
    }
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this classroom?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const response = await axios.delete(`http://localhost:5000/api/deleteClassroom/${id}`);
              if (response.status === 200) {
                toast.success('Subject deleted successfully');
                setRefereshToken(response);
              } else {
                console.error('Failed to delete classroom');
                setRefereshToken(response);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          },
          className: 'confirm-button-yes' 
        },
        {
          label: 'No',
          onClick: () => {}, 
          className: 'confirm-button-no' 
        }
      ],
      overlayClassName: 'confirm-overlay' 
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/classrooms', formData);
      if (response.status === 201) {
        toast.success('ClassRoom added successfully', { autoClose: 5000 });
        setRefereshToken(response)

      } else {
        console.error('Failed to add Classroom');
        setRefereshToken(response)
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-auto col-sm-3.2 bg-dark d-flex flex-column justify-content-between min-vh-100">
            <SideNavbar />
          </div>
          <div className="col">
            <h1 className="text-center mt-5 mb-4">Add Classroom</h1>

            <div className="d-flex justify-content-center">
              <div className="col-sm-6 p-4" style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="classroomName" className="form-label">
                      <FontAwesomeIcon icon={faChalkboard} className="me-2" />
                      <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>Classroom Name:</span>
                    </label>
                    <select
                      className="form-select"
                      id="classroomName"
                      name="classroomName"
                      value={formData.classroomName}
                      onChange={handleChange}
                      style={{ fontWeight: "bold", borderColor: "#77757c" }}
                    >
                      <option value="">Select Classroom</option>
                      <option value="Computer-2A">Computer-2A</option>
                      <option value="Computer-2B">Computer-2B</option>
                      <option value="Computer-3A">Computer-3A</option>
                      <option value="Computer-3B">Computer-3B</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                      <option value="Electrical">Electrical</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="classroomNameInput"
                      name="classroomName"
                      placeholder="Type Classroom Name (e.g., Computer-3A, Mechanical-3)"
                      value={formData.classroomName}
                      onChange={handleChange}
                      style={{ fontWeight: "bold", borderColor: "#77757c" }}
                    />
                  </div>

                  <div className="mb-3 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#5c3bcc" }}>
                      ADD
                    </button>
                  </div>
                </form>

            </div>
          </div>
          <div>
            <h2 className="mt-5 mb-3 text-center">Added Classrooms</h2>
            <table className="table table-striped">
              <thead className="thead-light">
                <tr>
                  <th sclassName="tables" cope="col">#</th>
                  <th className="tables" scope="col">Classroom Name</th>
                  <th className="tables" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.classroomName}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div >
    </>
  );
}

export default AddRooms;
