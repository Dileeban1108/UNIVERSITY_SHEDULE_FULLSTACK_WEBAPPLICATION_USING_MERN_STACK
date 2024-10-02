import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/addModal.css";
import { jwtDecode } from "jwt-decode";

const GradeModal = ({
  isOpen,
  toggleModal,
  newGrade,
  setNewGrade,
  handleInputChange,
  handleAddSubject,
  handleRemoveSubject,
  handleGrade,
  onDepartmentChange
}) => {
  const [students, setStudents] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const decoded = jwtDecode(accessToken); // Use jwtDecode correctly
        const email = decoded?.userInfo?.email;
          let response = await axios.get(
            `http://localhost:3001/auth/getUser/${email}`
          );
          if (response.data) {
            setUserDetails(response.data);
            if (onDepartmentChange) {
              onDepartmentChange(response.data.department);
            }
          } else {
            response = await axios.get(
              `http://localhost:3001/lecture/getLecturers/${email}`
            );
            if (response.data) {
              setUserDetails(response.data);
              if (onDepartmentChange) {
                onDepartmentChange(response.data.department);
              }
            }
          }
        
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, [onDepartmentChange]);

  useEffect(() => {
    if (isOpen) {
      fetchStudents();
    }
  }, [isOpen, userDetails]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/auth/getUsers/${userDetails.department}`
      );
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else if (response.data) {
        setStudents([response.data]); // Convert single object to array
      } else {
        console.error("Unexpected response data:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const handleStudentNumberChange = (e) => {
    const selectedStudent = students.find(student => student.studentnumber === e.target.value);
    if (selectedStudent) {
      setNewGrade(prevGrade => ({
        ...prevGrade,
        studentnumber: selectedStudent.studentnumber,
        username: selectedStudent.username
      }));
    }
  };

  if (!isOpen) return null;
  const formatStudentNumber = (studentnumber) => {
    if (studentnumber.length !== 9) return studentnumber; // Ensure valid length before formatting
    return `${studentnumber.slice(0, 2)}/${studentnumber.slice(2, 6)}/${studentnumber.slice(6)}`;
  };
  return (
    <div className="add-modal">
      <div className="add-form">
        <div className="form-close-btn" onClick={toggleModal}>
          &times;
        </div>
        <h3>Create A New Grade</h3>
        <select
          className='select-input-field'
          name="studentnumber"
          value={newGrade.studentnumber}
          onChange={handleStudentNumberChange}
        >
          <option value="" disabled>Select Student</option>
          {students.map((student) => (
            <option key={student.studentnumber} value={student.studentnumber}>
              {formatStudentNumber(student.studentnumber)}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="username"
          placeholder="Student Name"
          value={newGrade.username}
          onChange={(e) => handleInputChange(e)}
        />
        <div className="subjects-container">
          {newGrade.subjects && newGrade.subjects.map((subject, index) => (
            <div key={index} className="subject-input">
              <input
                type="text"
                name={`subjectname-${index}`}
                placeholder="Subject Name"
                value={subject.subjectname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name={`grade-${index}`}
                placeholder="Grade"
                value={subject.grade}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={() => handleRemoveSubject(index)}
                className="remove-subject-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddSubject}
          className="add-subject-btn"
        >
          Add Subject
        </button>
        <button className="add-btn" onClick={handleGrade}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default GradeModal;
