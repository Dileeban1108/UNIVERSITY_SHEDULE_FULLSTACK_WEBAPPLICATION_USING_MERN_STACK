import React from "react";
import "../styles/studentModal.css";
const StudentDetailsModal = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) {
    return null;
  }
  const formatStudentNumber = (studentnumber) => {
    // Assuming the format is SE2020027 and we want to convert it to SE/2020/027
    if (studentnumber.length !== 9) return studentnumber; // Ensure valid length before formatting
    return `${studentnumber.slice(0, 2)}/${studentnumber.slice(2, 6)}/${studentnumber.slice(6)}`;
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="btn-container">
          <h2>Student Details</h2>
          <span className="close-button_0" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="student-contents">
          <p>
            <strong>Username:</strong> {student.username}
          </p>
          <p>
            <strong>Student Number:</strong> {formatStudentNumber(student.studentnumber)}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Phone:</strong> {student.phone}
          </p>
          <p>
            <strong>Department:</strong> {student.department}
          </p>
          <p>
            <strong>Faculty:</strong> {student.faculty}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;
