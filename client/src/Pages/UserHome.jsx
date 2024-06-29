import React, { useState, useEffect } from "react";
import "../styles/userHome.css";
import axios from "axios";
import ProfileModal from "../components/StudentProfileModal"; // Import ProfileModal component
import LectureDetailsModal from "../components/LectureDetailsModal";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const UserHome = ({ userRole }) => {
  const [activeSection, setActiveSection] = useState("courses");
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [exams, setExams] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isProfileModalOpen_2, setProfileModalOpen_2] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [isLecturerModalOpen, setLecturerModalOpen] = useState(false);
  const [grades, setGrades] = useState([]);

  const toggleProfileModal_2 = () => {
    setProfileModalOpen_2(!isProfileModalOpen_2);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);

    if (section === "students") {
      fetchLecturers();
    }
  };

  const toggleProfileModal = () => {
    setProfileModalOpen(!isProfileModalOpen);
  };

  const handleLogOut = () => {
    localStorage.removeItem("userinfo");
    userRole = "";
    window.location.reload();
  };
  const handleLecturerClick = (student) => {
    setSelectedLecturer(student);
    setLecturerModalOpen(true);
  };
  const closeLecturerModal = () => {
    setLecturerModalOpen(false);
  };
  const fetchLecturers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lecture/getLecturer/${userDetails.department}`
      );
      console.log("Fetched students:", response.data); // Debugging
      if (Array.isArray(response.data)) {
        setLecturers(response.data);
      } else if (response.data) {
        setLecturers([response.data]); // Convert single object to array
      } else {
        console.error("Unexpected response data:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch lecturers", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lecture/getCourse/${userDetails.department}`
      );
      if (Array.isArray(response.data)) {
        setCourses(response.data);
      } else if (response.data) {
        setCourses([response.data]); // Convert single object to array
      } else {
        console.error("Unexpected response data:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lecture/getEnrolledCourses/${userDetails.email}`
      );
      if (Array.isArray(response.data)) {
        setEnrolledCourses(response.data);
      } else if (response.data) {
        setEnrolledCourses([response.data]); // Convert single object to array
      } else {
        console.error("Unexpected response data:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lecture/getAssignment/${userDetails.department}`
      );
      if (Array.isArray(response.data)) {
        setAssignments(response.data);
      } else if (response.data) {
        setAssignments([response.data]);
      } else {
        console.error("Unexpected response data:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch assignments", error);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lecture/getSheduledExams/${userDetails.department}`
      );
      if (Array.isArray(response.data)) {
        setExams(response.data);
      } else if (response.data) {
        setExams([response.data]); // Convert single object to array
      } else {
        console.error("Unexpected response data:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch exams", error);
    }
  };

  const handleEnroll = async (course) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/lecture/enrollCourse`,
        {
          lecturername: course.lecturername,
          coursecode: course.coursecode,
          coursename: course.coursename,
          department: userDetails.department,
          faculty: userDetails.faculty,
          email: userDetails.email,
        }
      );
      if (response.status === 200) {
        setCourses((prevCourses) =>
          prevCourses.filter((c) => c.coursecode !== course.coursecode)
        );
        fetchEnrolledCourses();
        toast.success("Successfully enroll the course");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleRemove = async (coursecode) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/lecture/removeEnrolledCourse/${coursecode}`
      );
      if (response.status === 200) {
        fetchEnrolledCourses();
        toast.success("Successfully logged in");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const fetchGrades = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lecture/getGrade/${userDetails.studentnumber}`
      );
      if (Array.isArray(response.data)) {
        setGrades(response.data);
      } else {
        console.error("Unexpected response data:", response.data);
        setGrades([]); // Handle unexpected data format by setting to empty array
      }
    } catch (error) {
      console.error("Failed to fetch grades", error);
      setGrades([]); // Set to empty array on error
    }
  };
  const formatStudentNumber = (studentnumber) => {
    // Assuming the format is SE2020027 and we want to convert it to SE/2020/027
    if (studentnumber.length !== 9) return studentnumber; // Ensure valid length before formatting
    return `${studentnumber.slice(0, 2)}/${studentnumber.slice(2, 6)}/${studentnumber.slice(6)}`;
  };
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        const email = userinfo?.email;
        if (email) {
          const response = await axios.get(
            `http://localhost:3001/auth/getUser/${email}`
          );
          setUserDetails(response.data);
          console.log(userDetails.email);
        } else {
          console.log("No email found in localStorage.");
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (userDetails.department) {
      fetchLecturers();
      fetchCourses();
      fetchAssignments();
      fetchExams();
      fetchEnrolledCourses();
      fetchGrades();
    }
  }, [userDetails.department]);

  return (
    <div className="container_2">
      <Toaster position="top-right"/>
      <div className="main-container_3">
        <div className="sidebar">
          <div className="profile-icon" onClick={toggleProfileModal}>
            <div className="img"></div>
            <div className="profile-name">{userDetails.username}</div>
          </div>
          <ul>
            <li onClick={() => handleSectionChange("lecturers")}>
              Your Lecturers
            </li>
            <li onClick={() => handleSectionChange("allCourses")}>
              All Courses
            </li>
            <li onClick={() => handleSectionChange("enrolledCourses")}>
              Enrolled Courses
            </li>
            <li onClick={() => handleSectionChange("assignments")}>
              Assignments
            </li>
            <li onClick={() => handleSectionChange("scheduledExams")}>
              Scheduled Exams
            </li>
            <li onClick={() => handleSectionChange("grades")}>Grades</li>
          </ul>
        </div>

        <div className="content_2">
          {activeSection === "allCourses" && (
            <div className="section-container">
              <div className="items-container">
                {courses.map((course, index) => (
                  <div className="item" key={index}>
                    <h4>Course Name: {course.coursename}</h4>
                    <h4>Course Code: {course.coursecode}</h4>
                    <h4>Lecturer Name: {course.lecturername}</h4>
                    <div className="enroll-btn">
                      <button onClick={() => handleEnroll(course)}>
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === "lecturers" && (
            <div className="section-container">
              <div className="level-contentr">
                <ul className="student-list">
                  {lecturers.map((lecturer, index) => (
                    <li
                      key={index}
                      className="student"
                      onClick={() => handleLecturerClick(lecturer)}
                    >
                      {lecturer.username} - {lecturer.email}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {activeSection === "assignments" && (
            <div className="section-container">
              <div className="items-container">
                {assignments.map((assignment, index) => (
                  <div className="item" key={index}>
                    <h4>Course Code: {assignment.coursecode}</h4>
                    <h4>Course Name: {assignment.coursename}</h4>
                    <h4>Assignment: {assignment.assignmentname}</h4>
                    <h4>Deadline: {assignment.deadline}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === "scheduledExams" && (
            <div className="section-container">
              <div className="items-container">
                {exams.map((exam, index) => (
                  <div className="item" key={index}>
                    <h4>Exam: {exam.coursecode}</h4>
                    <h4>Date: {exam.date}</h4>
                    <h4>Time: {exam.time}</h4>
                    <h4>Place: {exam.location}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === "enrolledCourses" && (
            <div className="section-container">
              <div className="items-container">
                {enrolledCourses.map((enrolledCourse, index) => (
                  <div className="item" key={index}>
                    <h4>Course Code: {enrolledCourse.coursecode}</h4>
                    <h4>Course Name: {enrolledCourse.coursename}</h4>
                    <h4>Lecturer Name: {enrolledCourse.lecturername}</h4>
                    <div className="remove-btn">
                      <button
                        onClick={() => handleRemove(enrolledCourse.coursecode)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === "grades" && (
  <div className="section-container">
    <div className="items-container">
      {grades.map((grade, index) => (
        <div className="item" key={index}>
          <h4>Username: {grade.username}</h4>
          <h4>Student Number: {formatStudentNumber(grade.studentnumber)}</h4>
          <div className="grade-container">
            {grade.subjects.map((subject, subIndex) => (
              <div className="grade" key={subIndex}>
                <h4>
                  {subject.subjectname} - {subject.grade}
                </h4>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}

        </div>
      </div>

      <div className={`profile-modal ${isProfileModalOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleProfileModal}>
          &times;
        </div>
        <div className="profile-options">
          <button onClick={handleLogOut}>Logout</button>
          <button onClick={toggleProfileModal_2}>Update Profile</button>
        </div>
      </div>
      <ProfileModal
        isOpen={isProfileModalOpen_2}
        onClose={toggleProfileModal_2}
      />
      <LectureDetailsModal
        lecture={selectedLecturer}
        isOpen={isLecturerModalOpen}
        onClose={closeLecturerModal}
      />
    </div>
  );
};

export default UserHome;
