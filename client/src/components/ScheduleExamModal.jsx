import React from 'react';
import "../styles/addModal.css";

const ScheduleExamModal = ({ isOpen, toggleModal, newExam, handleInputChange, handleScheduleExam }) => {
  if (!isOpen) return null;

  return (
    <div className="add-modal">
      <div className="add-form">
        <div className="form-close-btn" onClick={toggleModal}>
          &times;
        </div>
        <h3>Schedule New Exam</h3>
        <input
          type="text"
          name="coursename"
          placeholder="Course Name"
          value={newExam.coursename}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="coursecode"
          placeholder="Course Code"
          value={newExam.coursecode}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Exam Date"
          value={newExam.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="time"
          placeholder="Exam Time"
          value={newExam.time}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Exam Location"
          value={newExam.location}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={newExam.department}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="faculty"
          placeholder="Faculty"
          value={newExam.faculty}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleScheduleExam}>Schedule Exam</button>
      </div>
    </div>
  );
};

export default ScheduleExamModal;
