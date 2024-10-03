import React from "react";
import "../styles/addModal.css";
import axios from "axios";
import { toast } from "react-toastify";
const faculties = ["Science", "Engineering", "Arts", "Business", "Medical"];
const departments = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Mechanical Engineering",
  "Software Engineering",
  "Civil Engineering",
  "Business Administration",
  "Economics",
];
const AddAssignmentModal = ({
  isOpen,
  toggleModal,
  newAssignment,
  setNewAssignment,
  setAssignments,
  assignments,
  handleAssignmentInputChange,
}) => {
  if (!isOpen) return null;
  const handleAddAssignment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/lecture/createAssignment",
        newAssignment
      );
      setAssignments([...assignments, response.data]);
      setNewAssignment({
        coursename: "",
        coursecode: "",
        assignmentname: "",
        description: "",
        lecturername: "",
        deadline: "",
        department: "",
        faculty: "",
      });
      toggleModal();
      toast.success("Assignment added successfully", {
        icon: "👏",
        style: {
          border: "1px solid #4caf50",
          padding: "16px",
          color: "#4caf50",
        },
      });
    } catch (error) {
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
          onChange={handleAssignmentInputChange}
        />
        <input
          type="text"
          name="coursecode"
          placeholder="Course Name"
          value={newAssignment.coursecode}
          onChange={handleAssignmentInputChange}
        />
        <input
          type="text"
          name="assignmentname"
          placeholder="Assignment Name"
          value={newAssignment.assignmentname}
          onChange={handleAssignmentInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Assignment Description"
          value={newAssignment.description}
          onChange={handleAssignmentInputChange}
        />
        <input
          type="text"
          name="lecturername"
          placeholder="Lecturer Name"
          value={newAssignment.lecturername}
          onChange={handleAssignmentInputChange}
        />
        <input
          type="date"
          name="deadline"
          placeholder="Deadline"
          value={newAssignment.deadline}
          onChange={handleAssignmentInputChange}
        />
         <select
          className="input-field_select"
          name="faculty"
          value={newAssignment.faculty}
          onChange={handleAssignmentInputChange}
        >
          <option value="">Select Faculty</option>
          {faculties.map((faculty, index) => (
            <option key={index} value={faculty}>
              {faculty}
            </option>
          ))}
        </select>
        <select
          className="input-field_select"
          name="department"
          value={newAssignment.department}
          onChange={handleAssignmentInputChange}
        >
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <button className="add-btn" onClick={handleAddAssignment}>
          Add Assignment
        </button>
      </div>
    </div>
  );
};

export default AddAssignmentModal;
