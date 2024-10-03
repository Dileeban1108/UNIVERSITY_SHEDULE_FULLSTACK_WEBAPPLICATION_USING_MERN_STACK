const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require('../../servers/middlewares/verifyToken');

router.put("/updateUser", authController.updateUser);
router.put("/updateLecturer", authController.updateLecturer);
router.put("/updateStudentWelfare", authController.updateStudentWelfare);
router.post("/login", authController.handleLogin);
router.post("/shedule", authController.handleNewShedule);
router.get("/getshedule", authController.getSchedule);
router.get("/getUsers", authController.getUsers);
router.get("/getUser/:email",verifyToken, authController.getUserByEmail);
router.get("/fetchUsers/:department",authController.getUsersByDepartment);
router.delete("/deletelecture/:index", authController.deleteLecture);
router.get("/getReviews", authController.getReviews);
router.post("/createReview", authController.createReview);
router.post("/createAnnouncement", authController.handleNewAnnouncement);
router.get("/getAnnouncements", authController.getAnnouncements);
router.delete("/deleteAnnouncement/:id", authController.deleteAnnouncement);
router.post("/refresh-token", authController.handleRefreshToken);


module.exports = router;
