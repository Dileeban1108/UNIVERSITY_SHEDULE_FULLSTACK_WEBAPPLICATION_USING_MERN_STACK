import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "./Pages/Login";
import StudentRegister from "./Pages/StudentRegister"
import LecturerRegister from "./Pages/LecturerRegister"
import StudentWefareRegister from "./Pages/StudentWefareRegister"
import Home from "./Pages/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/studentRegister" element={<StudentRegister />} />
        <Route path="/lecturerRegister" element={<LecturerRegister />} />
        <Route path="/studentWefareRegister" element={<StudentWefareRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
