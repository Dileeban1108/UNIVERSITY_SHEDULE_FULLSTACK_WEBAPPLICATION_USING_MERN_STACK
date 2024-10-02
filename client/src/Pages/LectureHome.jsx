import React, { useState, useEffect } from "react";
import "../styles/lectureHome.css";
import axios from "axios";
import AddAssignmentModal from "../components/AddAssignmentModal";
import AddCourseModal from "../components/AddCourseModal";
import ScheduleExamModal from "../components/ScheduleExamModal";
import StudentDetailsModal from "../components/StudentDetailsModal";
import ProfileModal from "../components/LectureProfileModal"; // Import ProfileModal component
import GradeModal from "../components/GradeModal";
import { FaTrash } from "react-icons/fa"; // Import the delete icon from react-icons
import toast, { Toaster } from "react-hot-toast";

const LectureHome = ({userDetails}) => {
  const [activeSection, setActiveSection] = useState("courses");
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isAddCourseFormOpen, setAddCourseFormOpen] = useState(false);
  const [isAddAssignmentFormOpen, setAddAssignmentFormOpen] = useState(false);
  const [isExamScheduleFormOpen, setExamScheduleFormOpen] = useState(false);
  const [isGradeFormOpen, setGradeFormOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [grades, setGrades] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isProfileModalOpen_2, setProfileModalOpen_2] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentModalOpen, setStudentModalOpen] = useState(false);
  
  const toggleProfileModal_2 = () => {
    setProfileModalOpen_2(!isProfileModalOpen_2);
  };

  const [newGrade, setNewGrade] = useState({
    username: "",
    studentnumber: "",
    subjects: [{ subjectname: "", grade: "" }],
    department: "",
  });

  const [newCourse, setNewCourse] = useState({
    coursename: "",
    coursecode: "",
    lecturername: "",
    faculty: "",
    department: "",
  });

  const [newAssignment, setNewAssignment] = useState({
    coursename: "",
    coursecode: "",
    lecturername: "",
    deadline: "",
    faculty: "",
    department: "",
    assignmentname: "",
    description: "",
  });

  const [newExam, setNewExam] = useState({
    coursename: "",
    coursecode: "",
    date: "",
    time: "",
    location: "",
    faculty: "",
    department: "",
  });



  const handleSectionChange = (section) => {
    setActiveSection(section);

    if (section === "students") {
      fetchStudents();
    }
  };

  const toggleProfileModal = () => {
    setProfileModalOpen(!isProfileModalOpen);
  };

  const toggleAddCourseForm = () => {
    setAddCourseFormOpen(!isAddCourseFormOpen);
  };

  const toggleAddAssignmentForm = () => {
    setAddAssignmentFormOpen(!isAddAssignmentFormOpen);
  };

  const toggleExamScheduleForm = () => {
    setExamScheduleFormOpen(!isExamScheduleFormOpen);
  };

  const toggleGradeForm = () => {
    setGradeFormOpen(!isGradeFormOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("subjectname") || name.startsWith("grade")) {
      const index = parseInt(name.split("-")[1], 10);
      const field = name.split("-")[0];
      const subjects = [...newGrade.subjects];
      subjects[index][field] = value;
      setNewGrade({ ...newGrade, subjects });
    } else {
      setNewGrade({ ...newGrade, [name]: value });
    }
  };

  const handleAddSubject = () => {
    setNewGrade((prevGrade) => ({
      ...prevGrade,
      subjects: [...prevGrade.subjects, { subjectname: "", grade: "" }],
    }));
  };

  const handleRemoveSubject = (index) => {
    setNewGrade((prevGrade) => ({
      ...prevGrade,
      subjects: prevGrade.subjects.filter((_, i) => i !== index),
    }));
  };

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
      setAddCourseFormOpen(false);
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
      setAddAssignmentFormOpen(false);
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

  const handleScheduleExam = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/lecture/createExam",
        newExam
      );
      setExams([...exams, response.data]);
      setNewExam({
        coursename: "",
        coursecode: "",
        date: "",
        time: "",
        location: "",
        department: "",
        faculty: "",
      });
      setExamScheduleFormOpen(false);
      toast.success("exam sheduled successfully", {
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

  const handleGrade = async () => {
    if (
      !newGrade.username ||
      !newGrade.studentnumber ||
      !newGrade.department ||
      !newGrade.subjects.length
    ) {
      alert("Please fill out all fields");
      return;
    }

    for (const subject of newGrade.subjects) {
      if (!subject.subjectname || !subject.grade) {
        alert("Please fill out all subject fields");
        return;
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/lecture/createGrade",
        newGrade
      );
      toggleGradeForm();
      toast.success("grade added successfully", {
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

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setStudentModalOpen(true);
  };

  const closeStudentModal = () => {
    setStudentModalOpen(false);
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/auth/fetchUsers/${userDetails.department}`
      );
      if (Array.isArray(response.data)) {
        setStudents(response.data);
      } else if (response.data) {
        setStudents([response.data]);
      } else {
        console.error("Unexpected response data:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };
  

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lecture/getCourses/${userDetails.department}`
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

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lecture/getAssignments/${userDetails.department}`
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
  const fetchGrades = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/lecture/getGrades/${userDetails.department}`
      );
      setGrades(response.data);
    } catch (error) {
      console.error("Failed to fetch grades", error);
    }
  };
  const handleDelete = async (studentnumber) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/lecture/deleteGrade/${studentnumber}`
      );
      if (response.status === 200) {
        console.log("Grade deleted successfully");
        // Optionally, you can also remove the deleted grade from the state
        setGrades(
          grades.filter((grade) => grade.studentnumber !== studentnumber)
        );
        toast.success("successfully deleted");
      } else {
        toast.error("Something went wrong");
        // Optionally, inform the user about the failure
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };



  useEffect(() => {
    if (userDetails.department) {
      fetchStudents();
      fetchCourses();
      fetchAssignments();
      fetchExams();
      fetchGrades();
    }
  }, [userDetails.department]);
  const handleDepartmentChange = (department) => {
    setNewGrade((prevGrade) => ({
      ...prevGrade,
      department,
    }));
  };
  const formatStudentNumber = (studentnumber) => {
    // Assuming the format is SE2020027 and we want to convert it to SE/2020/027
    if (studentnumber.length !== 9) return studentnumber; // Ensure valid length before formatting
    return `${studentnumber.slice(0, 2)}/${studentnumber.slice(
      2,
      6
    )}/${studentnumber.slice(6)}`;
  };
  return (
    <div className="container_2">
      <div className="main-container_3">
        <Toaster position="top-right" />
        <div className="sidebar">
          <div className="profile-icon" onClick={toggleProfileModal}>
            <div className="img"></div>
            <div className="profile-name">{userDetails.username}</div>
          </div>
          <ul>
            <li onClick={() => handleSectionChange("courses")}>Courses</li>
            <li onClick={() => handleSectionChange("students")}>Students</li>
            <li onClick={() => handleSectionChange("assignments")}>
              Assignments
            </li>
            <li onClick={() => handleSectionChange("scheduleExams")}>
              Schedule Exams
            </li>
            <li onClick={() => handleSectionChange("CreateGrade")}>
              Create Grade
            </li>
          </ul>
        </div>

        <div className="content_2">
          {activeSection === "courses" && (
            <div className="section-container">
              <div className="add-container">
                <div className="add-course" onClick={toggleAddCourseForm}>
                  <p>+ Add Course</p>
                </div>
              </div>
              <div className="items-container">
                {courses.map((course, index) => (
                  <div className="item" key={index}>
                    <h4>Course Name: {course.coursename}</h4>
                    <h4>Course Code: {course.coursecode}</h4>
                    <h4>Lecturer Name: {course.lecturername}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === "students" && (
            <div className="section-container">
              <div className="level-contentr">
                <ul className="student-list">
                  {students.map((student, index) => (
                    <li
                      key={index}
                      className="student"
                      onClick={() => handleStudentClick(student)}
                    >
                      {student.username} - {student.email}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {activeSection === "assignments" && (
            <div className="section-container">
              <div className="add-container">
                <div className="add-course" onClick={toggleAddAssignmentForm}>
                  <p>+ Add Assignment</p>
                </div>
              </div>
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
          {activeSection === "scheduleExams" && (
            <div className="section-container">
              <div className="add-container">
                <div className="add-course" onClick={toggleExamScheduleForm}>
                  <p>+ Schedule An Exam</p>
                </div>
              </div>
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
          {activeSection === "CreateGrade" && (
            <div className="section-container">
              <div className="add-container">
                <div className="add-course" onClick={toggleGradeForm}>
                  <p>+ Create A Grade For A Student</p>
                </div>
              </div>
              <div className="items-container">
                {grades.map((grade, index) => (
                  <div className="itemx" key={index}>
                    <h4>Username: {grade.username}</h4>
                    <h4>
                      Student Number: {formatStudentNumber(grade.studentnumber)}
                    </h4>

                    <div className="grade-container">
                      {grade.subjects.map((subject, subIndex) => (
                        <div className="grade" key={subIndex}>
                          <h4>
                            {subject.subjectname}- {subject.grade}
                          </h4>
                          <button
                            className="delete-icon"
                            onClick={() => {
                              handleDelete(grade.studentnumber);
                            }}
                          >
                            <FaTrash />
                          </button>
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

      <AddCourseModal
        isOpen={isAddCourseFormOpen}
        toggleModal={toggleAddCourseForm}
        newCourse={newCourse}
        handleInputChange={handleInputChange}
        handleAddCourse={handleAddCourse}
      />

      <AddAssignmentModal
        isOpen={isAddAssignmentFormOpen}
        toggleModal={toggleAddAssignmentForm}
        newAssignment={newAssignment}
        handleInputChange={handleInputChange}
        handleAddAssignment={handleAddAssignment}
      />

      <ScheduleExamModal
        isOpen={isExamScheduleFormOpen}
        toggleModal={toggleExamScheduleForm}
        newExam={newExam}
        handleInputChange={handleInputChange}
        handleScheduleExam={handleScheduleExam}
      />

      <GradeModal
        isOpen={isGradeFormOpen}
        toggleModal={toggleGradeForm}
        newGrade={newGrade}
        setNewGrade={setNewGrade}
        handleInputChange={handleInputChange}
        handleAddSubject={handleAddSubject}
        handleRemoveSubject={handleRemoveSubject}
        handleGrade={handleGrade}
        onDepartmentChange={handleDepartmentChange}
      />

      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isStudentModalOpen}
        onClose={closeStudentModal}
      />
    </div>
  );
};

export default LectureHome;
