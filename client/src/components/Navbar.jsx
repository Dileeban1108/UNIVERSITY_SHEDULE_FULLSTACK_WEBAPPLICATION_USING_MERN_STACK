import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import { Link as RouterLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const NavBar = ({ userRole, userDetails }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const decoded = jwtDecode(accessToken); // Use a library like jwt-decode to get user details from the token
        const email = decoded?.userInfo?.email; // Correctly access the email
        if (email) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    fetchUserDetails();
  }, []);
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h1 className="logo-text">Uni Pro</h1>
        </div>
        <ul className="nav-links">
          <>
            <li>
              <RouterLink
                to="/"
                className="home"
                style={{ textDecoration: "none" }}
              >
                Home
              </RouterLink>
            </li>

            {!isLoggedIn && (
              <li>
                <RouterLink
                  className="loginBtn"
                  to="/login"
                  style={{ textDecoration: "none" }}
                >
                  Get Started
                </RouterLink>
              </li>
            )}
          </>
        </ul>
      </div>
    </nav>
  );
};
export default NavBar;
