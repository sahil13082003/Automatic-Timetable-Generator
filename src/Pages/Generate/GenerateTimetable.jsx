// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import SideNavbar from '../../Components/SideNavbar'; // Assuming SideNavbar component is in the same directory
// import axios from 'axios'; // Import Axios for making HTTP requests

// function GenerateTimetable() {
//     const [semester, setSemester] = useState('');
//     const [branch, setBranch] = useState('');
//     const [timetable, setTimetable] = useState([]);

//     const handleGenerate = async () => {
//         // Make an HTTP request to the backend to generate the timetable
//         try {
//             const response = await axios.get('http://localhost:5000/api/generateTimeTable');
//             console.log(response.data.timetable); // Ensure the structure of the response
//             setTimetable(response.data.timetable);
//         } catch (error) {
//             console.error('Error fetching timetable:', error);
//         }
//     };

//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-auto col-sm-3.2 bg-dark d-flex flex-column justify-content-between min-vh-100">
//                         <SideNavbar />
//                     </div>
//                     <div className="col">
//                         <h1 className="text-center mt-5 mb-4">Generate Timetable</h1>
//                         <div className="row">
//                             <div className="col">
//                                 <div className="mb-3">
//                                     <label htmlFor="semester" className="form-label">Semester:</label>
//                                     <input type="text" className="form-control" id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="branch" className="form-label">Choose Branch:</label>
//                                     <select className="form-select" id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
//                                         <option value="">Choose Branch</option>
//                                         <option value="Computer-A">Computer-A</option>
//                                         <option value="Computer-B">Computer-B</option>
//                                         <option value="Electrical">Electrical</option>
//                                         <option value="Mechanical">Mechanical</option>
//                                     </select>
//                                 </div>
//                                 <div className="text-center">
//                                     <button className="btn btn-primary" onClick={handleGenerate}>Generate</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col">
//                         <h2 className="text-center my-4">Timetable</h2>
//                         <table border="1">
//                             <tbody>
//                                 {/* Check if timetable is an array before mapping */}
//                                 {timetable && timetable.map((branchData, branchIndex) => (
//                                     <tr key={branchIndex}>
//                                         <th>{branchData.semester}</th>
//                                         {/* Check if branchData.timetable is an array before mapping */}
//                                         {branchData.timetable && branchData.timetable.map((day, dayIndex) => (
//                                             <React.Fragment key={dayIndex}>
//                                                 <th>{day}</th>
//                                                 {day.map((time, timeIndex) => (
//                                                     <td key={timeIndex}>{time ? `${time.subject} - ${time.teacher}` : '-'}</td>
//                                                 ))}
//                                             </React.Fragment>
//                                         ))}
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default GenerateTimetable;



import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Timetable = () => {
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/generateTimeTable")
      .then(response => {
        console.log(response, "response");
        setTimetableData(response.data.timetable);
      })
      .catch(error => {
        console.error("Error fetching timetable data: ", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Timetable</h2>
      {timetableData.map((item, index) => (
        <div key={index} className="mb-5">
          <h3 className="text-center mb-3">{item.department} - Semester {item.semester}</h3>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Day</th>
                <th>Period 1</th>
                <th>Period 2</th>
                <th>Period 3</th>
                <th>Period 4</th>
                <th>Period 5</th>
                <th>Period 6</th>
              </tr>
            </thead>
            <tbody>
              {item.timetable.map((day, dayIndex) => (
                <tr key={dayIndex}>
                  <td className="font-weight-bold">{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex]}</td>
                  {day.map((period, periodIndex) => (
                    <td key={periodIndex} className="p-3">
                      <div className="border p-2 bg-light">
                        {period ? `${period.subject} - ${period.teacher}` : "-"}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Timetable;
