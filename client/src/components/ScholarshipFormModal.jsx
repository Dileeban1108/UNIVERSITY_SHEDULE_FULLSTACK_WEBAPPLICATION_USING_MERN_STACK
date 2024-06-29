import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/modal.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const ScholarshipFormModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    studentNumber: "",
    email: "",
    faculty: "",
    department: "",
    reason: "",
    scholarship: ""
  });

  useEffect(() => {
    const loadScholarships = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/other/getScholarships`);
        setScholarships(response.data);
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };

    loadScholarships();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleScholarshipClick = (scholarshipName) => {
    setSelectedScholarship(scholarshipName);
    setFormData({ ...formData, scholarship: scholarshipName });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/other/applyScolarship`, formData);
      console.log('Scholarship application submitted successfully', response.data);
      closeModal();
      toast.success("Successfully logged in");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={`modalx ${isOpen ? "open" : ""}`}>
      <Toaster position="top-right"/>
      <div className="modal-contentx">
        <div className="btn-container">
          <h2>Apply For A Scholarship</h2>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className="form-containerx">
          <div className="list">
            <ul>
              {scholarships.map((scholarship) => (
                <li key={scholarship.id} onClick={() => handleScholarshipClick(scholarship.name)}>
                  <h4>{scholarship.name}</h4>
                  <h6>{scholarship.description}</h6>
                  <h5>dead line:{scholarship.deadline}</h5>
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
              name="scholarship"
              required
              placeholder="Scholarship Name"
              value={selectedScholarship}
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

export default ScholarshipFormModal;
