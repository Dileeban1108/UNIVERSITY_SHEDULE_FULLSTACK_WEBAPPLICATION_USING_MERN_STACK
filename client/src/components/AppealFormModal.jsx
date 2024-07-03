import React, { useState } from "react";
import axios from "axios";
import "../styles/modal.css";
import toast, { Toaster } from "react-hot-toast";

const ApealFormModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    studentnumber: "",
    email: "",
    faculty: "",
    department: "",
    appealdes: "",
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
      const response = await axios.post(
        `http://localhost:3001/other/createAppeal`,
        formData
      );
      // Handle the response if needed
      closeModal();
      toast.success("successfully  applied", {
        icon: "👏",
        style: {
          border: "1px solid #4caf50",
          padding: "16px",
          color: "#4caf50",
        },
      });
      setTimeout(() => {}, 2000);
    } catch (error) {
      toast.error("Something went wrong.", {
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
          <h2>Appeal</h2>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <form className="form_2" onSubmit={handleSubmit}>
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
