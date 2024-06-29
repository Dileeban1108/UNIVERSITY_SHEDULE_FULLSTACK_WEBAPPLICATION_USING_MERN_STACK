import React from 'react';
import "../styles/addModal.css";

const AddCourseModal = ({ isOpen, toggleModal, newCourse, handleInputChange, handleAddCourse }) => {
  if (!isOpen) return null;

  return (
    <div className="add-modal">
      <div className="add-form">
        <div className="form-close-btn" onClick={toggleModal}>
          &times;
        </div>
        <h3>Add New Course</h3>
        <input
          type="text"
          name="coursename"
          placeholder="Course Name"
          value={newCourse.coursename}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="coursecode"
          placeholder="Course Code"
          value={newCourse.coursecode}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lecturername"
          placeholder="Lecturer Name"
          value={newCourse.lecturername}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="faculty"
          placeholder="Faculty"
          value={newCourse.faculty}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={newCourse.department}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleAddCourse}>Add Course</button>
      </div>
    </div>
  );
};

export default AddCourseModal;
