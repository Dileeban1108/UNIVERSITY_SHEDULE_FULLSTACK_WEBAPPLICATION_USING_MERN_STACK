import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/review.css";
import userImage from "../assets/user.jpg"; // Correctly import the image
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const ReviewPage = ({ userDetails }) => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getReviews"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === reviews.length - 1 ? 0 : prevPage + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNextPage, 3500);
    return () => clearInterval(interval);
  }, [reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/createReview",
        {
          name: userDetails.username,
          review: review,
        }
      );
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setReview(""); // Reset review state
      window.location.reload();
      toast.success("Successfully added", {
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

  return (
    <section className="reviewsx">
      <Toaster position="top-right" />
      <div className="textx">
        <h1>Tell Us How To Improve</h1>
      </div>
      {userDetails && Object.keys(userDetails).length > 0 && (
        <form className="review-formx" onSubmit={handleSubmit}>
          <div className="review-inputsx">
            <textarea
              name="review"
              placeholder="Your Review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
            <div className="sub2x">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      )}
      <div className="review-containerx">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="review-boxx"
            style={{ transform: `translateX(-${currentPage * 112.8}%)` }}
          >
            <img src={userImage} alt="Reviewer" />
            <h3>{review.name}</h3>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewPage;
