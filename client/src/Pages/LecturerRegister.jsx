import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [username, setLecturename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [university, setUniversity] = useState("");
  const [position, setPosition] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");

  const facultyOptions = ["Science", "Engineering", "Arts", "Business"];
  const departmentOptions = {
    Science: ["Biology", "Chemistry", "Physics"],
    Engineering: ["Computer Science", "Mechanical Engineering", "Electrical Engineering"],
    Arts: ["History", "Literature", "Philosophy"],
    Business: ["Accounting", "Marketing", "Finance"],
  };
  const positionOptions = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer"];

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePrev = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/register/lecturerRegister",
        {
          username,
          email,
          password,
          phone,
          address,
          university,
          position,
          faculty,
          department,
        }
      );
      if (response && response.data.success) {
        navigate("/login");
      } else {
        toast.success("register successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container">
      <Navbar  />
      <Toaster position="top-right"/>
      <div className="main_container">
        {step === 1 && (
          <form className="form" onSubmit={handleNext}>
            <h2 className="title">Register As A Lecturer</h2>
            <input
              className="input-field"
              type="text"
              name="username"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setLecturename(e.target.value)}
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
            <div className="next-button-container">
              <button type="submit" className="next-btn">
                Next
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
            <input
              className="input-field"
              type="text"
              name="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="University"
              required
            />
            <select
              className="input-field_select"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              <option value="" disabled>Select Position</option>
              {positionOptions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>
            <select
              className="input-field_select"
              name="faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              required
            >
              <option value="" disabled>Select Faculty</option>
              {facultyOptions.map((faculty) => (
                <option key={faculty} value={faculty}>
                  {faculty}
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
              {faculty && departmentOptions[faculty].map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
            <div className="prev-button-container">
              <button type="button" className="prev-btn" onClick={handlePrev}>
                Prev
              </button>
            </div>
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
