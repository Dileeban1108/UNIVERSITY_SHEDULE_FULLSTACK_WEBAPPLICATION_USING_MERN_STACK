import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/modal.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const ScholarshipFormModal = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedClub, setSelectedClub] = useState("");
  const [clubs, setClubs] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    studentNumber: "",
    email: "",
    clubName: "",
    faculty: "",
    department: "",
    selectedClub: ""
  });

  useEffect(() => {
    const loadClubs = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/other/getClubs`);
        setClubs(response.data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    loadClubs();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleClubClick = (clubName) => {
    setSelectedClub(clubName);
    setFormData({ ...formData, selectedClub: clubName });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/other/joinClub`, formData);
      console.log('Club joined successfully', response.data);
      closeModal();
      toast.success("applied Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={`modalx ${isOpen ? "open" : ""}`}>
      <Toaster position="top-right"/>
      <div className="modal-contentx">
        <div className="btn-container">
          <h2>Join A Club</h2>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
        </div>
        <div className="form-containerx">
          <div className="list">
            <ul>
              {clubs.map((club) => (
                <li key={club.id} onClick={() => handleClubClick(club.name)}>
                  <h4>{club.name}</h4>
                  <h6>{club.description}</h6>
                </li>
              ))}
            </ul>
          </div>
          <form  className="formx" onSubmit={handleSubmit}>
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
              name="clubName"
              required
              placeholder="Club Name"
              value={formData.clubName}
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
              name="selectedClub"
              required
              placeholder="Selected Club"
              value={selectedClub}
              readOnly
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipFormModal;
