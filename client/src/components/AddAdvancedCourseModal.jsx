import React from 'react';
import "../styles/addModal.css";

const AddAdvancedCourseModal = ({ isOpen, toggleModal, newAdvancedCourse, handleInputChange, handleAddAdvancedCourse }) => {
  if (!isOpen) return null;

  return (
    <div className="add-modal">
      <div className="add-form">
        <div className="form-close-btn" onClick={toggleModal}>
          &times;
        </div>
        <h3>Add New Advanced Course</h3>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={newAdvancedCourse.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newAdvancedCourse.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="deadline"
          placeholder="Deadline"
          value={newAdvancedCourse.deadline}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleAddAdvancedCourse}>Add Course</button>
      </div>
    </div>
  );
};

export default AddAdvancedCourseModal;
