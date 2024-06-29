import React from 'react';
import "../styles/addModal.css";

const AddScholarshipModal = ({ isOpen, toggleModal, newScholarship, handleInputChange, handleAddScholarship }) => {
  if (!isOpen) return null;

  return (
    <div className="add-modal">
      <div className="add-form">
        <div className="form-close-btn" onClick={toggleModal}>
          &times;
        </div>
        <h3>Add New Scholarship</h3>
        <input
          type="text"
          name="name"
          placeholder="Scholarship Name"
          value={newScholarship.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newScholarship.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="deadline"
          placeholder="Deadline"
          value={newScholarship.deadline}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleAddScholarship}>Add Scholarship</button>
      </div>
    </div>
  );
};

export default AddScholarshipModal;
