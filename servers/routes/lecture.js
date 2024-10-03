const express = require("express");
const router = express.Router();
const lectureController = require("../controllers/lectureController");
const verifyToken = require('../../servers/middlewares/verifyToken');

router.get('/getLecturers/:department', lectureController.getLecturers);
router.get('/getLecturer/:email', verifyToken, lectureController.getLecturerByEmail);
router.get('/getWelfare/:email', verifyToken, lectureController.getStudentWelfareByEmail);
router.get('/getCourses/:department', lectureController.getCourses);
router.get('/getAssignments/:department', lectureController.getAssignments);
router.get('/getSheduledExams/:department', lectureController.getExams);
router.post('/createCourse', lectureController.handleNewCourse);
router.post('/createAdvancedCourse', lectureController.handleNewAdvancedCourse);
router.post('/createClub', lectureController.handleNewClub);
router.post('/createScholarship', lectureController.handleNewScholarship);
router.post('/createAssignment', lectureController.handleNewAssignment);
router.post('/createAnnouncement', lectureController.handleNewAnnouncement);
router.post('/createExam', lectureController.handleNewExam);
router.post('/enrollCourse', lectureController.handleNewEnrolledCourse);
router.get('/getEnrolledCourses/:email', lectureController.getEnrolledCourses);
router.delete('/removeEnrolledCourse/:coursecode', lectureController.removeEnrolledCourse);
router.post('/createGrade', lectureController.createGrade);
router.delete('/deleteGrade/:id', lectureController.deleteStudentGrade);
router.delete('/deleteStudent/:id', lectureController.handleDeleteStudent);
router.delete('/deleteCourse/:id', lectureController.handleDeleteCourse);
router.delete('/deleteAssignment/:id', lectureController.handleDeleteAssignment);
router.delete('/deleteExam/:id', lectureController.handleDeleteExam);
router.delete('/deleteScholarship/:name', lectureController.deleteScholarship);
router.delete('/deleteClub/:name', lectureController.deleteClub); 
router.delete('/deleteAdvancedCourse/:name', lectureController.deleteAdvancedCourse);
router.put('/updateGrade/:email', lectureController.updateStudentGrade);
router.get('/getGrade/:studentnumber', lectureController.getStudentGrade);
router.get('/getGrades/:department', lectureController.getStudentGradesByDepartment);

module.exports = router;
