import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/modal.css";
import toast, { Toaster } from "react-hot-toast";

const AdvancedCourseFormModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    studentnumber: "",
    email: "",
    faculty: "",
    department: "",
    coursename: "", 
  });

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/other/getAdvancedCourses`
        );
        setCourses(response.data); // Ensure to set the courses data correctly
      } catch (error) {
        console.log(error);
      }
    };

    loadCourses();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleCourseClick = (courseName) => {
    setFormData({ ...formData, coursename: courseName }); // Ensure to set 'coursename' field
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/other/applyAdvancedCourse`,
        formData
      );
      console.log("Application submitted successfully", response.data);
      toast.success("Application submitted successfully", {
        icon: "👏",
        style: {
          border: "1px solid #4caf50",
          padding: "16px",
          color: "#4caf50",
        },
      });
      closeModal();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Error submitting application.", {
        icon: "❌",
        style: {
          border: "1px solid #ff4d4f",
          padding: "16px",
          color: "#ff4d4f",
        },
      });
    }
  };

  return (
    <div className={`modalx ${isOpen ? "open" : ""}`}>
      <Toaster position="top-right" />
      <div className="modal-contentx">
        <div className="btn-container">
          <h2>Apply For An Advanced Course</h2>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className="form-containerx">
          <div className="list">
            <ul>
              {courses.map((course) => (
                <li
                  key={course.id}
                  onClick={() => handleCourseClick(course.name)}
                >
                  <h4>{course.name}</h4>
                  <h6>{course.description}</h6>
                  <h5>Deadline: {course.deadline}</h5>
                </li>
              ))}
            </ul>
          </div>
          <form className="formx" onSubmit={handleSubmit}>
            <input
              type="text"
              name="coursename"
              required
              placeholder="Course Name"
              value={formData.coursename}
              readOnly
            />
            <input
              type="text"
              name="username"
              required
              placeholder="Your Name"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="studentnumber"
              required
              placeholder="Student Number"
              value={formData.studentnumber}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="faculty"
              required
              placeholder="Faculty"
              value={formData.faculty}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="department"
              required
              placeholder="Department"
              value={formData.department}
              onChange={handleInputChange}
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCourseFormModal;
