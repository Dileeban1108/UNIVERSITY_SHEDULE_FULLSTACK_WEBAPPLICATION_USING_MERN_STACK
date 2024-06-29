import React, { useState } from "react";
import axios from "axios";
import "../styles/modal.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ApealFormModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    studentNumber: "",
    email: "",
    faculty: "",
    department: "",
    appealdes: ""
  });

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/other/createAppeal`, formData);
      // Handle the response if needed
      closeModal();
      toast.success("Appelled Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={`modalx ${isOpen ? "open" : ""}`}>
      <Toaster position="top-right"/>
      <div className="modal-contentx">
        <div className="btn-container">
          <h2>Appeal</h2>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <form className="form_2" onSubmit={handleSubmit}>
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
          <textarea
            name="appealdes"
            placeholder="Write Your Appeal Here"
            value={formData.appealdes}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ApealFormModal;
