const express = require("express");
const router = express.Router();

const {
  getStudentById,
  getStudent,
  updateStudent,
  userPurchaseList,
} = require("../controllers/student");
const { isSignedIn, isAuthenticated,  } = require("../controllers/auth");

router.param("userId", getStudentById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getStudent);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateStudent);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateStudentClassList);
router.get(
  "/order/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
