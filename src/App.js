import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import SignInPage from './Components/SignInPage';
import Navbar from './Components/Navbar';

import AddSubjects from './Pages/Subjects/AddSubjects';
import AddTeacher from './Pages/Teachers/AddTeachers';
import AddRooms from './Pages/Rooms/AddRooms';
import AssignRooms from './Pages/Assign/AssignRooms';
import AssignElective from './Pages/Assign/AssignElective';
import AssignLab from './Pages/Assign/AssignLab';
import AssignTheory from './Pages/Assign/AssignTheory';
import GenerateTimetable from './Pages/Generate/GenerateTimetable'

import Home from './Pages/Home'
import './styling/HomePage.css'
import About from './Pages/About';
import Features from './Pages/Features';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/about" element={<Features />} />
        <Route path="/help" element={<About/>} />

        <Route path="/add-subject" element={<AddSubjects />} />
        <Route path="/add-teachers" element={<AddTeacher />} />
        <Route path="/add-classrooms" element={<AddRooms />} />
        <Route path="/assign-theory" element={<AssignTheory />} />
        <Route path="/assign-lab" element={<AssignLab />} />
        <Route path="/assign-elective" element={<AssignElective />} />
        <Route path="/assign-rooms" element={<AssignRooms />} />
        <Route path="/generate" element={<AddSubjects/>}></Route>
        <Route path="/generate-timetable" element={<GenerateTimetable />}></Route>

      </Routes>
    </Router>
  );
}

export default App;



