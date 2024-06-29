import React, { useState } from "react";
import "../styles/servises.css"; // Corrected file name
import ScholarshipFormModal from "../components/ScholarshipFormModal";
import AdvancedCourseFormModal from "../components/AdvancedCourseFormModal";
import AppealFormModal from "../components/AppealFormModal";
import ClubFormModal from "../components/ClubFormModal";

const Services = () => {
  const [showScholarshipModal, setShowScholarshipModal] = useState(false);
  const [showAdvancedCourseModal, setShowAdvancedCourseModal] = useState(false);
  const [showAppealFormModal, setShowAppealFormModal] = useState(false);
  const [showClubFormModal, setShowClubFormModal] = useState(false);
const handleApplyScholashipClick=()=>{
  setShowScholarshipModal(true)
}
const handleCloseScholarshipFormModal=()=>{
  setShowScholarshipModal(false)
}
  return (
    <section id="services">
      <div className="services-container">
        <div className="contents">
          <div className="service boxa" onClick={handleApplyScholashipClick}>
            <h2>Apply For Scholarships</h2>
            <p>Access our extensive library of online courses covering a wide range of subjects.</p>
          </div>
          <div className="service boxb" onClick={() => setShowAdvancedCourseModal(true)}>
            <h2>Apply Advanced Courses</h2>
            <p>Get personalized assistance from expert tutors in real-time through live sessions.</p>
          </div>
          <div className="service boxc" onClick={() => setShowAppealFormModal(true)}>
            <h2>Appeal Forms</h2>
            <p>Access comprehensive study materials including notes, quizzes, and practice exams.</p>
          </div>
          <div className="service boxd" onClick={() => setShowClubFormModal(true)}>
            <h2>Join With A Club</h2>
            <p>Access our extensive library of online courses covering a wide range of subjects.</p>
          </div>
        </div>
      </div>

      {showScholarshipModal && <ScholarshipFormModal onClose={handleCloseScholarshipFormModal}/>}
      {showAdvancedCourseModal && <AdvancedCourseFormModal onClose={() => setShowAdvancedCourseModal(false)} />}
      {showAppealFormModal && <AppealFormModal onClose={() => setShowAppealFormModal(false)} />}
      {showClubFormModal && <ClubFormModal onClose={() => setShowClubFormModal(false)} />}
    </section>
  );
};

export default Services;
