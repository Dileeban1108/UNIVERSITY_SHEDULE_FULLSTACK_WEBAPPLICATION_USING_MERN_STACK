import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const NavBar = ({ userRole, userDetails }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        const email = userinfo?.email;
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
          <h1 className="logo-text">Uni Mgt System</h1>
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
