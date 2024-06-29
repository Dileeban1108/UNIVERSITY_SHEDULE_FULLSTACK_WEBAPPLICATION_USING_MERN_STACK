import React from "react";
import Navbar from "../components/Navbar";
import "../styles/universities.css";

const UniversitiesPage = () => {
  return (
    <div>
      <Navbar />
      <div className="universities-container">
        <div className="university box1"></div>
        <div className="university box2"></div>
        <div className="university box3"></div>
        <div className="university box4"></div>
        <div className="university box5"></div>
        <div className="university box6"></div>
        <div className="university box7"></div>
        <div className="university box8"></div>
        <div className="university box9"></div>
        <div className="university box10"></div>
      </div>
    </div>
  );
};

export default UniversitiesPage;
