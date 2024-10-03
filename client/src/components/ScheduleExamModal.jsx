import React from "react";
import axios from "axios";
import "../styles/addModal.css";
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

const ScheduleExamModal = ({
  isOpen,
  toggleModal,
  newExam,
  setNewExam,
  setExams,
  exams,
  handleExamInputChange,
}) => {
  if (!isOpen) return null;

  const handleScheduleExam = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/lecture/createExam",
        newExam
      );
      setExams([...exams, response.data]); // Update the exam list with new exam
      setNewExam({
        coursename: "",
        coursecode: "",
        date: "",
        time: "",
        location: "",
        department: "",
        faculty: "",
      });
      toggleModal(); // Close the modal
      toast.success("Exam scheduled successfully", {
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
        <h3>Schedule New Exam</h3>
        <input
          type="text"
          name="coursename"
          placeholder="Course Name"
          value={newExam.coursename}
          onChange={handleExamInputChange}
        />
        <input
          type="text"
          name="coursecode"
          placeholder="Course Code"
          value={newExam.coursecode}
          onChange={handleExamInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Exam Date"
          value={newExam.date}
          onChange={handleExamInputChange}
        />
        <input
          type="text"
          name="time"
          placeholder="Exam Time"
          value={newExam.time}
          onChange={handleExamInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Exam Location"
          value={newExam.location}
          onChange={handleExamInputChange}
        />
        <select
          className="input-field_select"
          name="faculty"
          value={newExam.faculty}
          onChange={handleExamInputChange}
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
          value={newExam.department}
          onChange={handleExamInputChange}
        >
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <button className="add-btn" onClick={handleScheduleExam}>
          Schedule Exam
        </button>
      </div>
    </div>
  );
};

export default ScheduleExamModal;
