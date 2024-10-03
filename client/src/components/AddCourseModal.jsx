import React from "react";
import "../styles/addModal.css";
import { toast } from "react-toastify";
import axios from "axios";

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
const AddCourseModal = ({
  isOpen,
  toggleModal,
  newCourse,
  setNewCourse,
  setCourses,
  courses,
  handleCourseInputChange,
}) => {
  if (!isOpen) return null;
  const handleAddCourse = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/lecture/createCourse",
        newCourse
      );
      setCourses([...courses, response.data]);
      setNewCourse({
        coursename: "",
        coursecode: "",
        lecturername: "",
        faculty: "",
        department: "",
      });
      toggleModal();
      toast.success("Course added successfully", {
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
        <h3>Add New Course</h3>
        <input
          type="text"
          name="coursename"
          placeholder="Course Name"
          value={newCourse.coursename}
          onChange={handleCourseInputChange}
        />
        <input
          type="text"
          name="coursecode"
          placeholder="Course Code"
          value={newCourse.coursecode}
          onChange={handleCourseInputChange}
        />
        <input
          type="text"
          name="lecturername"
          placeholder="Lecturer Name"
          value={newCourse.lecturername}
          onChange={handleCourseInputChange}
        />
        <select
          className="input-field_select"
          name="faculty"
          value={newCourse.faculty}
          onChange={handleCourseInputChange}
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
          value={newCourse.department}
          onChange={handleCourseInputChange}
        >
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        <button className="add-btn" onClick={handleAddCourse}>
          Add Course
        </button>
      </div>
    </div>
  );
};

export default AddCourseModal;
