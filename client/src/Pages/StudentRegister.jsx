import React, { useState } from "react";
import "../styles/auth.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [studentnumber, setStudentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");

  // Example faculty and department options
  const facultyOptions = ["Science", "Engineering", "Arts", "Business","Medical"];
  const departmentOptions = {
    Science: ["Biology", "Chemistry", "Physics","software engineering"],
    Engineering: ["Computer Science", "Mechanical Engineering", "Electrical Engineering"],
    Arts: ["History", "Literature", "Philosophy"],
    Business: ["Accounting", "Marketing", "Finance"],
    Medical:["medicine","dental","veterinary"]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register/studentRegister", {
        username,
        studentnumber,
        email,
        password,
        phone,
        faculty,
        department,
      });
      if (response && response.data.success) {
        toast.success("register successfully");
        localStorage.setItem("userinfo", JSON.stringify({ username, email }));
        navigate("/login");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container">
      <Navbar />
      <Toaster position="top-right"/>
      <div className="main_container">
        <form className="form_lr" onSubmit={handleSubmit}>
          <h2 className="title">Register As A Student</h2>
          <input
            className="input-field"
            type="text"
            name="studentnumber"
            placeholder="Student Number"
            value={studentnumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="text"
            name="username"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="University Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <input
            className="input-field"
            type="text"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
          />
          <select
            className="input-field_select"
            name="faculty"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            required
          >
            <option value="" disabled>Select Faculty</option>
            {facultyOptions.map((facultyOption) => (
              <option key={facultyOption} value={facultyOption}>
                {facultyOption}
              </option>
            ))}
          </select>
          <select
            className="input-field_select"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="" disabled>Select Department</option>
            {faculty && departmentOptions[faculty].map((departmentOption) => (
              <option key={departmentOption} value={departmentOption}>
                {departmentOption}
              </option>
            ))}
          </select>
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
          <div className="link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
