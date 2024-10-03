import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/homepage.css";
import UniversitiesPage from "./Universities";
import Footer from "../components/Footer";
import AboutPage from "./About";
import ReviewPage from "./ReviewPage";
import Services from "./Servises"; // Corrected typo
import LectureHome from "./LectureHome";
import UserHome from "./UserHome";
import StudentWelfareHome from "./StudentWelfareHome";
import DashBoard from "./DashBoard";
import { BiUpArrow } from "react-icons/bi"; // Import the icon
import Announcement from "./Announcement";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [userRole, setUserRole] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      const backToTopButton = document.querySelector(".back-to-top");
      if (window.scrollY > 100) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Retrieve the access token from local storage
        const accessToken = localStorage.getItem("accessToken");
        const decoded = jwtDecode(accessToken); // Use jwtDecode correctly
        const email = decoded?.userInfo?.email; // Correctly access the email
        let response = await axios.get(
          `http://localhost:3001/lecture/getWelfare/${email}`, // Use email in the URL
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token
            },
          }
        );

        if (response.data) {
          setUserRole("welfare");
          console.log("welfare");
          setUserDetails(response.data);
        } else {
          console.error("User role not found for the given email");
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, []); // Ensure the dependency array is correct
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Retrieve the access token from local storage
        const accessToken = localStorage.getItem("accessToken");
        // Verify the token and get user info (like email) if not stored
        const decoded = jwtDecode(accessToken); // Use a library like jwt-decode to get user details from the token
        const email = decoded?.userInfo?.email; // Correctly access the email
        let response = await axios.get(
          `http://localhost:3001/auth/getUser/${email}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token
            },
          }
        );
        if (response.data) {
          setUserRole("user");
          console.log("user");
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, []);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Retrieve the access token from local storage
        const accessToken = localStorage.getItem("accessToken");
        const decoded = jwtDecode(accessToken); // Use a library like jwt-decode to get user details from the token
        const email = decoded?.userInfo?.email; // Correctly access the email
        let response = await axios.get(
          `http://localhost:3001/lecture/getLecturer/${email}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Include the access token
            },
          }
        );
        if (response.data) {
          setUserRole("lecturer");
          console.log("lecturer");
          setUserDetails(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="container">
        <Navbar userRole={userRole} userDetails={userDetails} />
        {userRole === "lecturer" && <LectureHome userDetails={userDetails}/>}
        {userRole === "user" && <UserHome userDetails={userDetails}/>}
        {userRole === "welfare" && <StudentWelfareHome userDetails={userDetails}/>}
        {!userRole && <DashBoard id="main" />}
        <UniversitiesPage id="universities" />
        <Services id="services" />
        <Announcement userRole={userRole} id="announcement" />
        <AboutPage id="aboutus" />
        <ReviewPage id="reviews" userDetails={userDetails} />
      </div>
      <Footer id="footer" />
      <button className="back-to-top" onClick={scrollToTop}>
        <BiUpArrow size={24} />
      </button>
    </>
  );
};

export default Home;
