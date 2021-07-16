const Student = require("../model/student");
const Classes = require("../model/classes");
//const classes = require("../model/classes");

exports.getStudentById = (req, res, next, id) => {
  Student.findById(id).exec((err, student) => {
    if (err || !student) {
      return res.status(400).json({
        error: "No Student was found in DB",
      });
    }
    req.profile = student;
    next();
  });
};


exports.getStudent = (req, res) => {
  //TO DO get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateStudent = (req, res) => {
  Student.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, student) => {
      if (err) {
        return res.status(400).json({
          error: "you are not authorize to update",
        });
      }
      student.salt = undefined;
        student.encry_password = undefined;
      return res.json(student);
    }
  );
};


exports.StudentClassList = (req, res) => {

  // Classes.find({ Student: req.profile._id })
  //   .populate("Student", "_id name")
  //   .exec((err, Class) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: "No class in this account",
  //       });
  //     }
  //     return res.json(Class);
  //   });
  return res.json(req.profile.classes);
};



exports.addClass= (req, res) => {
  
  
  Student.findByIdAndUpdate(
    { _id: req.profile._id },

    { $push: {"classes" : 
      req.body._id
    } },
    { new: true, useFindAndModify: false },
    (err, student) => {
      if (err) {
        return res.status(400).json({
          error: "you are not authorize to update",
        });
      }
      student.salt = undefined;
        student.encry_password = undefined;
      return res.json(student);
    }
  );
};


// isko use krna h classes k controller mein

// exports.pushClassInClassList = (req, res, next) => {
//   let purchases = [];
//   req.body.order.products.forEach((product) => {
//     purchases.push({
//       _id: product._id,
//       name: product.name,
//       description: product.description,
//       category: product.category,
//       quantity: product.quantity,
//       amount: req.body.order.amount,
//       transaction_id: req.body.order.transaction_id,
//     });
//   });

// exports.pushClassInClassList = (req, res, next) => {
//   let purchases = [];
//   req.body.order.products.forEach((product) => {
//     purchases.push({
//       _id: product._id,
//       name: product.name,
//       description: product.description,
//       category: product.category,
//       quantity: product.quantity,
//       amount: req.body.order.amount,
//       transaction_id: req.body.order.transaction_id,
//     });
//   });


//   //store this in DB
//   User.findOneAndUpdate(
//     { _id: req.profile._id },
//     { $push: { purchases: purchases } },
//     { new: true },
//     (err, purchases) => {
//       if (err) {
//         return res.status(400).json({
//           error: "Unable to save purchase List",
//         });
//       }
//       next();
//     }
//   );
// };
