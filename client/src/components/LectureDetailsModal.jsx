import React from "react";
import "../styles/studentModal.css";
const LectureDetailsModal = ({ lecture, isOpen, onClose }) => {
  if (!isOpen || !lecture) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="btn-container">
          <h2>Lecture Details </h2>
          <span className="close-button_0" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="student-contents">
          <p>
            <strong>Username:</strong> {lecture.username}
          </p>
          <p>
            <strong>Position:</strong> {lecture.position}
          </p>
          <p>
            <strong>Email:</strong> {lecture.email}
          </p>
          <p>
            <strong>Phone:</strong> {lecture.phone}
          </p>
          <p>
            <strong>Department:</strong> {lecture.department}
          </p>
          <p>
            <strong>Faculty:</strong> {lecture.faculty}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LectureDetailsModal;
