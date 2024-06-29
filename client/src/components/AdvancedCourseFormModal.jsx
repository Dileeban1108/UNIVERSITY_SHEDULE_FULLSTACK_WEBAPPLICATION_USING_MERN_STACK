import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/modal.css";

const AdvancedCourseFormModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    studentNumber: "",
    email: "",
    faculty: "",
    department: "",
    reason: "",
    course: ""
  });

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/other/getAdvancedCourses`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    loadCourses();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleCourseClick = (courseName) => {
    setSelectedCourse(courseName);
    setFormData({ ...formData, course: courseName });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/other/applyAdvancedCourse`, formData);
      console.log('Application submitted successfully', response.data);
      closeModal();
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className={`modalx ${isOpen ? "open" : ""}`}>
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
                <li key={course.id} onClick={() => handleCourseClick(course.name)}>
                  <h4>{course.name}</h4>
                  <h6>{course.description}</h6>
                  <h5>dead line:{course.deadline}</h5>
                </li>
              ))}
            </ul>
          </div>
          <form className="formx" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="studentNumber"
              required
              placeholder="Student Number"
              value={formData.studentNumber}
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
            <input
              type="text"
              name="course"
              required
              placeholder="Course Name"
              value={selectedCourse}
              readOnly
            />
            <textarea
              name="reason"
              placeholder="Write The Reason Why You Are Applying"
              value={formData.reason}
              onChange={handleInputChange}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCourseFormModal;
