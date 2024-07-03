import React from "react";
import "../styles/homepage.css";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();

  const handleStudentRegister = () => {
    navigate("/studentRegister");
  };
  const handleLecturerRegister = () => {
    navigate("/lecturerRegister");
  };
  const handleStudentWelfareRegister = () => {
    navigate("/studentWefareRegister");
  };
  return (
    <div className="dashboard_2">
      <div className="box_2">
        <h3>For Students</h3>
        <p>
          Are you a student looking to stay organized and manage your academic
          life efficiently? Sign up as a student to gain access to a
          personalized dashboard where you can keep track of your assignments,
          deadlines, and academic progress.
        </p>
        <button onClick={handleStudentRegister} className="register-btn">
          Register
        </button>
      </div>
      <div className="box_2">
        <h3>For Lecturers</h3>
        <p>
          Are you a lecturer passionate about teaching and empowering students?
          Sign up as a lecturer to access a suite of tools designed to enhance
          your teaching experience. Create and manage courses, share resources,
          and communicate with your students effortlessly.
        </p>
        <button onClick={handleLecturerRegister} className="register-btn">
          Register
        </button>
      </div>
      <div className="box_2">
        <h3>For Student Welfare Division</h3>
        <p>
          Are you currently working with the welfare division of the university.
          Sign up as a member to access a suite of tools designed to enhance
          your teaching experience. Create and manage advanced
          courses,appeals,announcements and communicate with the students
          effortlessly.
        </p>
        <button onClick={handleStudentWelfareRegister} className="register-btn">
          Register
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
