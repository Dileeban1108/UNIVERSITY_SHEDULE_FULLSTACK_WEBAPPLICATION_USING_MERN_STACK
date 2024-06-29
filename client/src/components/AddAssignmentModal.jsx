import React from 'react';
import "../styles/addModal.css";

const AddAssignmentModal = ({ isOpen, toggleModal, newAssignment, handleInputChange, handleAddAssignment }) => {
  if (!isOpen) return null;

  return (
    <div className="add-modal">
      <div className="add-form">
        <div className="form-close-btn" onClick={toggleModal}>
          &times;
        </div>
        <h3>Add New Assignment</h3>
        <input
          type="text"
          name="coursename"
          placeholder="Course Name"
          value={newAssignment.coursename}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="coursecode"
          placeholder="Course Name"
          value={newAssignment.coursecode}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="assignmentname"
          placeholder="Assignment Name"
          value={newAssignment.assignmentname}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Assignment Description"
          value={newAssignment.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lecturername"
          placeholder="Lecturer Name"
          value={newAssignment.lecturername}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="deadline"
          placeholder="Deadline"
          value={newAssignment.deadline}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={newAssignment.department}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="faculty"
          placeholder="Faculty"
          value={newAssignment.faculty}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleAddAssignment}>Add Assignment</button>
      </div>
    </div>
  );
};

export default AddAssignmentModal;
