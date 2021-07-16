const Student = require("../model/student");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const student = new Student(req.body);
  student.save((err, student) => {
    if (err) {
      return res.status(400).json({
        err: "not able to save user in DB",
      });
    }
    res.json({
      name: student.name,
      email: student.email,
      id: student._id,
    });
  });
};



exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  Student.findOne({ email }, (err, student) => {
    if (err || !student) {
      return res.status(400).json({
        error: "USER email doesnot exist in DB",
      });
    }

    if (!student.autheticate(password)) {
      return res.status(401).json({
        error: "email and password doesnot match",
      });
    }

    // create token
    const token = jwt.sign({ _id: student._id }, process.env.SECRET);
    // put token in cookie

    res.cookie("token", token, { expire: new Date() + 9999 });
    //send responce to frontend

    const { _id, name, email } = student;
    return res.json({
      token,
      user: { _id,name ,email },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user sign out successfully",
  });
};

//protected route
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middleware

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

