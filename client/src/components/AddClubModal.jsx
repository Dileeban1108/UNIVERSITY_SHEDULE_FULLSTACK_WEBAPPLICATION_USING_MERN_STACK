import React from 'react';
import "../styles/addModal.css";

const AddClubModal = ({ isOpen, toggleModal, newClub, handleInputChange, handleAddClub }) => {
  if (!isOpen) return null;

  return (
    <div className="add-modal">
      <div className="add-form">
        <div className="form-close-btn" onClick={toggleModal}>
          &times;
        </div>
        <h3>Add New Club</h3>
        <input
          type="text"
          name="name"
          placeholder="Club Name"
          value={newClub.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newClub.description}
          onChange={handleInputChange}
        />
        <button className="add-btn" onClick={handleAddClub}>Add Club</button>
      </div>
    </div>
  );
};

export default AddClubModal;
