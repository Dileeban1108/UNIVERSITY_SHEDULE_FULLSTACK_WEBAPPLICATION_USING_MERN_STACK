import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/profileModal.css";
import toast, { Toaster } from "react-hot-toast";

const LectureProfileModal = ({ isOpen, onClose }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    studentnumber:"",
    email: "",
    phone: "",
    faculty: "",
    department: ""
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
              `http://localhost:3001/auth/getUser/${email}`
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
        "http://localhost:3001/auth/updateUser",
        userDetails
      );
      if (response.data.success) {
        toast.success("successfully  updated", {
          icon: "👏",
          style: {
            border: "1px solid #4caf50",
            padding: "16px",
            color: "#4caf50",
          },
        });
        onClose();
      } else {
        toast.error("Failed to update.", {
          icon: "❌",
          style: {
            border: "1px solid #ff4d4f",
            padding: "16px",
            color: "#ff4d4f",
          },
        });
      }
    } catch (error) {
      toast.error("Failed to update.", {
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
              <label>Student Number:</label>
              <input
                type="text"
                name="studentnumber"
                value={userDetails.studentnumber}
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
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={userDetails.department}
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
