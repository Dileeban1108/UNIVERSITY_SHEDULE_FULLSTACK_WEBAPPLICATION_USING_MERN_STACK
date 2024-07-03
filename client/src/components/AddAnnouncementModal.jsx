import React, { useState } from "react";
import "../styles/addModal.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddAnnouncementModal = ({ show, onClose }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      const uploadResponse = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadResponse.data.filePath;

      const response = await axios.post(
        "http://localhost:3001/auth/createAnnouncement",
        {
          description,
          image: imageUrl,
        }
      );

      if (response && response.data.success) {
        toast.success("successfully  created", {
          icon: "👏",
          style: {
            border: "1px solid #4caf50",
            padding: "16px",
            color: "#4caf50",
          },
        });
        setTimeout(() => {}, 2000);
      } else {
        toast.error("Something went wrong.", {
          icon: "❌",
          style: {
            border: "1px solid #ff4d4f",
            padding: "16px",
            color: "#ff4d4f",
          },
        });
      }
    } catch (error) {
      console.error(error);
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
  if (!show) {
    return null;
  }
  return (
    <div className="add-modal">
      <Toaster position="top-right" />
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-close-btn" onClick={onClose}>
          &times;
        </div>
        <h3>Add New Announcement</h3>
        <input
          type="file"
          accept="/image/"
          onChange={(event) => {
            const file = event.target.files[0];
            if (file && file.type.substring(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
          name="image"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="submit">
          Add Announcement
        </button>
      </form>
    </div>
  );
};

export default AddAnnouncementModal;
