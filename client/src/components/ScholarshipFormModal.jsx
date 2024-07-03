import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/modal.css";
import toast, { Toaster } from "react-hot-toast";
const ScholarshipFormModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedScholarship, setSelectedScholarship] = useState("");
  const [scholarships, setScholarships] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    studentnumber: "",
    email: "",
    faculty: "",
    department: "",
    reason: "",
    scholarshipname: ""
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
    setFormData({ ...formData, scholarshipname: scholarshipName });
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
      toast.success("Applied successfully", {
        icon: "👏",
        style: {
          border: "1px solid #4caf50",
          padding: "16px",
          color: "#4caf50",
        },
      });
    } catch (error) {
      toast.error("Something went wrong", {
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
            <input
              type="text"
              name="scholarshipname"
              required
              placeholder="Scholarship Name"
              value={formData.scholarshipname}
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
