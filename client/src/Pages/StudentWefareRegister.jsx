import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [username, setLecturename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [university, setUniversity] = useState("");
  const [position, setPosition] = useState("");

  const positionOptions = [
    "incharge of university registration",
    "incharge of student affairs",
    "incharge of medical issues",
    "incharge of student appeals",
  ];
  const universityOptions = [
    "University Of Kelaniya",
    "University Of Colombo",
    "University Of Peradeniya",
    "University Of Ruhuna",
  ];
  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePrev = () => {
    setStep(1);
  };
  const validatePhoneNumber = (number) => {
    // Example regex for phone numbers (this may vary based on the country/format you want to support)
    const phoneRegex = /^[0-9]{10}$/; // This regex checks for exactly 10 digits
    return phoneRegex.test(number);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(phone)) {
      toast.error(
        "Invalid phone number. Please enter a valid 10-digit phone number.",
        {
          icon: "❌",
          style: {
            border: "1px solid #ff4d4f",
            padding: "16px",
            color: "#ff4d4f",
          },
        }
      );
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/register/studentWelfareRegister",
        {
          username,
          email,
          password,
          phone,
          address,
          university,
          position,
        }
      );
      if (response && response.data.success) {
        toast.success("Registered successfully", {
          icon: "👏",
          style: {
            border: "1px solid #4caf50",
            padding: "16px",
            color: "#4caf50",
          },
        });
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.", {
          icon: "❌",
          style: {
            border: "1px solid #ff4d4f",
            padding: "16px",
            color: "#ff4d4f",
          },
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Email already exists. Please use a different email.", {
            icon: "⚠️",
            style: {
              border: "1px solid #ffa726",
              padding: "16px",
              color: "#ffa726",
            },
          });
        } else if (error.response.status === 400) {
          toast.error("Bad Request. Please check your input values.", {
            icon: "⚠️",
            style: {
              border: "1px solid #ffa726",
              padding: "16px",
              color: "#ffa726",
            },
          });
        } else if (error.response.status === 500) {
          toast.error("Internal Server Error. Please try again later.", {
            icon: "❌",
            style: {
              border: "1px solid #ff4d4f",
              padding: "16px",
              color: "#ff4d4f",
            },
          });
        } else {
          toast.error(`Unexpected error: ${error.response.status}`, {
            icon: "❌",
            style: {
              border: "1px solid #ff4d4f",
              padding: "16px",
              color: "#ff4d4f",
            },
          });
        }
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your network connection.",
          {
            icon: "🌐",
            style: {
              border: "1px solid #ff9800",
              padding: "16px",
              color: "#ff9800",
            },
          }
        );
      } else {
        toast.error(`Error in setting up the request: ${error.message}`, {
          icon: "❌",
          style: {
            border: "1px solid #ff4d4f",
            padding: "16px",
            color: "#ff4d4f",
          },
        });
      }
    }
  };

  return (
    <div className="container">
      <Navbar />
      <Toaster position="top-right" />
      <div className="main_container">
        {step === 1 && (
          <form className="form" onSubmit={handleNext}>
            <h2 className="title">Register For Student Welfare Division</h2>
            <input
              className="input-field"
              type="text"
              name="username"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setLecturename(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="University Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              className="input-field"
              type="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
            />
            <div className="next-button-container">
              <button type="submit" className="next-btn">
                Next
              </button>
            </div>
            <div className="link">
              Already have an account? <a href="/login">Login</a>
            </div>
          </form>
        )}
        {step === 2 && (
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
            <select
              className="input-field_select"
              name="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="University"
              required
            >
              <option value="" disabled>
                Select University
              </option>
              {universityOptions.map((university) => (
                <option key={university} value={university}>
                  {university}
                </option>
              ))}
            </select>
            <select
              className="input-field_select"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Position
              </option>
              {positionOptions.map((position) => (
                <option key={position} value={position}>
                  {position}
                </option>
              ))}
            </select>

            <div className="prev-button-container">
              <button type="button" className="prev-btn" onClick={handlePrev}>
                Prev
              </button>
            </div>
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
            <div className="link">
              Already have an account? <a href="/login">Login</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
