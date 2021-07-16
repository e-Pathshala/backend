const express = require("express");
const router = express.Router();

const {
  getTeacherById,
  getTeacher,
  updateTeacher,
  TeacherClassList,
  createClass,
  addClass,
  getAllStudent,
  addStudents,
  addAttendence
} = require("../controllers/teacher");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("teacherId", getTeacherById);

router.get("/teacher/:teacherId", isSignedIn, isAuthenticated, getTeacher);
router.put("/teacher/:teacherId", isSignedIn, isAuthenticated, updateTeacher);
router.get(
  "/class/teacher/:teacherId",
  isSignedIn,
  isAuthenticated,
  TeacherClassList
);
router.post(
  "/class/teacher/studentlist/:teacherId",
  isSignedIn,
  isAuthenticated,
  getAllStudent
);
router.post(
  "/class/teacher/addstudents/:teacherId",
  isSignedIn,
  isAuthenticated,
  addStudents
);
router.post(
  "/class/teacher/addattendence/:teacherId",
  isSignedIn,
  isAuthenticated,
  addAttendence
);

router.put("/createclass/teacher/:teacherId", isSignedIn, isAuthenticated, createClass,addClass);

//router.put("/teacher/addstudent/:teacherId", isSignedIn, isAuthenticated, getClass,addStudent);




module.exports = router;
