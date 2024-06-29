import React, { useState, useEffect } from "react";
import "../styles/lectureHome.css";
import axios from "axios";
import AddAdvancedCourseModal from "../components/AddAdvancedCourseModal";
import AddClubModal from "../components/AddClubModal";
import AddScholarshipModal from "../components/AddScholarshipModal";
import AddAnnouncementModal from "../components/AddAnnouncementModal";
import ProfileModal from "../components/WelfareProfileModal";
import StudentDetailsModal from "../components/StudentDetailsModal";
import toast, { Toaster } from "react-hot-toast";

const StudentWelfareHome = ({ userRole }) => {
  const [activeSection, setActiveSection] = useState("advancedcourses");
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isProfileModalOpen_2, setProfileModalOpen_2] = useState(false);
  const [isAddAdvancedCourseFormOpen, setAddAdvancedCourseFormOpen] =useState(false);
  const [isAddClubFormOpen, setAddClubFormOpen] = useState(false);
  const [isAddScholarshipFormOpen, setAddScholarshipFormOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [advancedCourses, setAdvancedCourses] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isStudentModalOpen, setStudentModalOpen] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const toggleProfileModal = () => {
    setProfileModalOpen(!isProfileModalOpen);
  };

  const toggleProfileModal_2 = () => {
    setProfileModalOpen_2(!isProfileModalOpen_2);
  };

  const toggleAddAdvancedCourseForm = () => {
    setAddAdvancedCourseFormOpen(!isAddAdvancedCourseFormOpen);
  };

  const toggleAddClubForm = () => {
    setAddClubFormOpen(!isAddClubFormOpen);
  };

  const toggleAddScholarshipForm = () => {
    setAddScholarshipFormOpen(!isAddScholarshipFormOpen);
  };

  const [newAdvancedCourse, setnewAdvancedCourse] = useState({
    name: "",
    description: "",
    deadline: "",
  });
  const [newScholarship, setNewScholarship] = useState({
    name: "",
    description: "",
    deadline: "",
  });

  const [newClub, setNewClub] = useState({
    name: "",
    description: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isAddAdvancedCourseFormOpen) {
      setnewAdvancedCourse({ ...newAdvancedCourse, [name]: value });
    } else if (isAddClubFormOpen) {
      setNewClub({ ...newClub, [name]: value });
    } else if (isAddScholarshipFormOpen) {
      setNewScholarship({ ...newScholarship, [name]: value });
    }
  };

  const handleAddAdvancedCourse = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/lecture/createAdvancedCourse",
        newAdvancedCourse
      );
      setAdvancedCourses([...advancedCourses, response.data]);
      setnewAdvancedCourse({
        name: "",
        description: "",
        deadline: "",
      });
      setAddAdvancedCourseFormOpen(false);
      toast.success("New advanced course added");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleAddClub = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/lecture/createClub",
        newClub
      );
      setClubs([...clubs, response.data]);
      setNewClub({
        name: "",
        description: "",
      });
      setAddClubFormOpen(false);
      toast.success("New club added");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleAddScholarship = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/lecture/createScholarship",
        newScholarship
      );
      setScholarships([...scholarships, response.data]);
      setNewScholarship({
        name: "",
        description: "",
        deadline: "",
      });
      setAddScholarshipFormOpen(false);
      toast.success("New scholarship added");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("userinfo");
    window.location.reload();
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/other/getAdvancedCourses`
      );
      setAdvancedCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const fetchClubs = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/other/getClubs`);
      setClubs(response.data);
    } catch (error) {
      console.error("Failed to fetch clubs", error);
    }
  };

  const fetchScholarships = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/other/getScholarships`
      );
      setScholarships(response.data);
    } catch (error) {
      console.error("Failed to fetch scholarships", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        const email = userinfo?.email;
        if (email) {
          const response = await axios.get(
            `http://localhost:3001/lecture/getWelfare/${email}`
          );
          setUserDetails(response.data);
        } else {
          console.log("No email found in localStorage.");
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
    fetchCourses();
    fetchClubs();
    fetchScholarships();
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const closeStudentModal = () => {
    setStudentModalOpen(false);
    setSelectedStudent(null);
  };
  const handleScholarshipDelete = async (name) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/lecture/deleteScholarship/${name}`
      );
      if (response.status === 200) {
        console.log("Grade deleted successfully");
        setScholarships(
          scholarships.filter((scholarship) => scholarship.name !== name)
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
  const handleClubDelete = async (name) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/lecture/deleteClub/${name}`
      );
      if (response.status === 200) {
        console.log(" deleted successfully");
        setClubs(clubs.filter((club) => club.name !== name));
        toast.success("successfully deleted");
      } else {
        toast.error("Something went wrong");
        // Optionally, inform the user about the failure
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const handleAdvancedCourseDelete = async (name) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/lecture/deleteAdvancedCourse/${name}`
      );
      if (response.status === 200) {
        setAdvancedCourses(
          advancedCourses.filter(
            (advancedCourse) => advancedCourse.name !== name
          )
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
  const handleAddAnnouncementClick = () => {
    setShowAnnouncementModal(true);
  };
  const handleCloseAnnouncementModal = () => {
    setShowAnnouncementModal(false);
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
            <li onClick={() => handleSectionChange("advancedcourses")}>
              Advanced Courses
            </li>
            <li onClick={() => handleSectionChange("clubs")}>Clubs</li>
            <li onClick={() => handleSectionChange("scholarships")}>
              Scholarships
            </li>
            <li onClick={() => handleSectionChange("announcements")}>
              Add Announcement
            </li>
          </ul>
        </div>

        <div className="content_2">
          {activeSection === "advancedcourses" && (
            <div className="section-container">
              <div className="add-container">
                <div
                  className="add-course"
                  onClick={toggleAddAdvancedCourseForm}
                >
                  <p>+ Add Advanced Course</p>
                </div>
              </div>
              <div className="items-container">
                {advancedCourses.map((advancedCourse, index) => (
                  <div className="item" key={index}>
                    <h4>Course Name: {advancedCourse.name}</h4>
                    <h4>Course Description: {advancedCourse.description}</h4>
                    <h4>Course Deadline: {advancedCourse.deadline}</h4>
                    <button
                      className="deleteIcon"
                      onClick={() => {
                        handleAdvancedCourseDelete(advancedCourse.name);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === "clubs" && (
            <div className="section-container">
              <div className="add-container">
                <div className="add-course" onClick={toggleAddClubForm}>
                  <p>+ Add Club</p>
                </div>
              </div>
              <div className="items-container">
                {clubs.map((club, index) => (
                  <div className="item" key={index}>
                    <h4>Club Name: {club.name}</h4>
                    <h4>Club Description: {club.description}</h4>
                    <button
                      className="deleteIcon"
                      onClick={() => {
                        handleClubDelete(club.name);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === "scholarships" && (
            <div className="section-container">
              <div className="add-container">
                <div className="add-course" onClick={toggleAddScholarshipForm}>
                  <p>+ Add Scholarship</p>
                </div>
              </div>
              <div className="items-container">
                {scholarships.map((scholarship, index) => (
                  <div className="item" key={index}>
                    <h4>Scholarship Name: {scholarship.name}</h4>
                    <h4>Scholarship Description: {scholarship.description}</h4>
                    <h4>Scholarship Deadline: {scholarship.deadline}</h4>
                    <button
                      className="deleteIcon"
                      onClick={() => {
                        handleScholarshipDelete(scholarship.name);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSection === "announcements" && (
            <div className="section-container">
              <div className="add-container">
                <div
                  className="add-course"
                  onClick={handleAddAnnouncementClick}
                >
                  <p>+ Add Announcement</p>
                </div>
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

      <AddAdvancedCourseModal
        isOpen={isAddAdvancedCourseFormOpen}
        toggleModal={toggleAddAdvancedCourseForm}
        newAdvancedCourse={newAdvancedCourse}
        handleInputChange={handleInputChange}
        handleAddAdvancedCourse={handleAddAdvancedCourse}
      />

      <AddClubModal
        isOpen={isAddClubFormOpen}
        toggleModal={toggleAddClubForm}
        newClub={newClub}
        handleInputChange={handleInputChange}
        handleAddClub={handleAddClub}
      />

      <AddScholarshipModal
        isOpen={isAddScholarshipFormOpen}
        toggleModal={toggleAddScholarshipForm}
        newScholarship={newScholarship}
        handleInputChange={handleInputChange}
        handleAddScholarship={handleAddScholarship}
      />

      <AddAnnouncementModal
        show={showAnnouncementModal}
        onClose={handleCloseAnnouncementModal}
      />

      <StudentDetailsModal
        student={selectedStudent}
        isOpen={isStudentModalOpen}
        onClose={closeStudentModal}
      />
    </div>
  );
};

export default StudentWelfareHome;
