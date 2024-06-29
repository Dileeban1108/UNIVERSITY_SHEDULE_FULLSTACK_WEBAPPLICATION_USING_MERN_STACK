import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/profileModal.css";
import toast, { Toaster } from "react-hot-toast";

const LectureProfileModal = ({ isOpen, onClose }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    phone: "",
    department: "",
    faculty: "",
    university: "",
    address: "",
    position: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchUserDetails = async () => {
        setLoading(true);
        try {
          const userinfo = JSON.parse(localStorage.getItem("userinfo"));
          if (userinfo && userinfo.email) {
            const email = userinfo.email;
            const response = await axios.get(
              `http://localhost:3001/lecture/getLecturers/${email}`
            );
            if (response.data) {
              setUserDetails(response.data);
            }
          }
        } catch (error) {
          console.error("Failed to fetch user details", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserDetails();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        "http://localhost:3001/auth/updateLecturer",
        userDetails
      );
      if (response.data.success) {
        toast.success("Updated Successfully");
        onClose();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={`profile-modal_2 ${isOpen ? "open" : ""}`}>
      <Toaster position="top-right" />
      <div className="profile-content_2">
        <div className="btn-container">
          <h2>Update Profile</h2>
          <div className="close-btn_2" onClick={onClose}>
            &times;
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="input-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={userDetails.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                readOnly
              />
            </div>
            <div className="input-group">
              <label>Phone:</label>
              <input
                type="number"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={userDetails.department}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Faculty:</label>
              <input
                type="text"
                name="faculty"
                value={userDetails.faculty}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>University:</label>
              <input
                type="text"
                name="university"
                value={userDetails.university}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>Position:</label>
              <input
                type="text"
                name="position"
                value={userDetails.position}
                onChange={handleChange}
              />
            </div>
            <button className="update-btn_2" onClick={handleUpdateProfile}>
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LectureProfileModal;
