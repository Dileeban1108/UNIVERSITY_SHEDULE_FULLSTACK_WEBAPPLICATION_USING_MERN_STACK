import React, { useState, useEffect } from "react";
import "../styles/announcement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Announcement = ({ userRole }) => {
  const [announcements, setAnnouncements] = useState([]);
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getAnnouncements"
        );
        if (response.data) {
          // Correct the image paths to use forward slashes
          const formattedAnnouncements = response.data.map((announcement) => ({
            ...announcement,
            image: announcement.image.replace(/\\/g, "/"),
          }));
          setAnnouncements(formattedAnnouncements);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/auth/deleteAnnouncement/${id}`);
      if (response.status === 200) {
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter((announcement) => announcement._id !== id)
        );
        toast.success("Announcement deleted successfully", {
          icon: "👏",
          style: {
            border: "1px solid #4caf50",
            padding: "16px",
            color: "#4caf50",
          },
        });      } else {
        toast.error("Error deleting announcement.", {
          icon: "❌",
          style: {
            border: "1px solid #ff4d4f",
            padding: "16px",
            color: "#ff4d4f",
          },
        });      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Error deleting announcement.", {
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
    <section className="services">
      <div className="announcement-container">
        <div className="slider">
          {announcements.map((announcement) => (
            <div key={announcement._id} className="slide">
              <div className="bac-img-container">
                <img src={announcement.image} alt="profile-image" className="bac-img"/>
                <div className="description">{announcement.description}</div>
                {userRole === "welfare" && (
                  <div
                    className="delete_icon"
                    onClick={() => handleDelete(announcement._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcement;
