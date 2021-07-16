const Teacher = require("../model/teacher");
const Classes = require("../model/classes");
const Student = require("../model/student");
//const classes = require("../model/classes");

exports.getTeacherById = (req, res, next, id) => {
  Teacher.findById(id).exec((err, teacher) => {
    if (err || !teacher) {
      return res.status(400).json({
        error: "No teacher was found in DB",
      });
    }
    req.profile = teacher;
    next();
  });
};


exports.getTeacher = (req, res) => {
  //TO DO get back here for password
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateTeacher = (req, res) => {
  Teacher.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, teacher) => {
      if (err) {
        return res.status(400).json({
          error: "you are not authorize to update",
        });
      }
      teacher.salt = undefined;
        teacher.encry_password = undefined;
      return res.json(teacher);
    }
  );
};


exports.TeacherClassList = (req, res) => {

 // var arr = req.profile.classes;
 // console.log(arr);
  Classes.find({ teacher: req.profile._id })
    .populate("_id")
    .exec((err, Class) => {
      if (err) {
        return res.status(400).json({
          error: "No class in this account",
        });
      }
      return res.json(Class);
    });

  
 // return res.json( classData);
};



exports.createClass = (req, res,next) => {
  //console.log("mein aa gya create class mein")
  req.body.teacher = req.profile._id;
  
  const newClass = new Classes(req.body);
  newClass.save((err, classes) => {
    if (err) {
      return res.status(400).json({
        err: "not able to save user in DB",
      });
    } 
    
   
    req.body= classes;
    next();
  });

};

exports.addClass= (req, res) => {
  
  
  Teacher.findByIdAndUpdate(
    { _id: req.profile._id },

    { $push: {"classes" : 
      req.body._id
    } },
    { new: true, useFindAndModify: false },
    (err, teacher) => {
      if (err) {
        return res.status(400).json({
          error: "you are not authorize to update",
        });
      }
      teacher.salt = undefined;
        teacher.encry_password = undefined;
      return res.json(teacher);
    }
  );
};

exports.getAllStudent = (req, res) => {
  
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Student.find({ branch : req.body.branch,
     batch : req.body.batch
  })
    //.populate("category")
    .sort([[sortBy, "asc"]])
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "No product found",
        });
      }
      
      res.json(products);
    });
};


exports.addStudents= (req, res) => {
  
  
  Classes.findByIdAndUpdate(
    { _id: req.body.class_id },

    { $push: {"enrolledStudent" : 
      req.body.list
    } },
    { new: true, useFindAndModify: false },
    (err, classes) => {
      if (err) {
        return res.status(400).json({
          error: "you are not authorize to update",
        });
      }
      
      return res.json(classes);
    }
  );
};

exports.addAttendence= (req, res) => {
  
  
  Classes.findByIdAndUpdate(
    { _id: req.body.class_id },

    { $push: {"attendence" : 
      req.body.list
    } },
    { new: true, useFindAndModify: false },
    (err, classes) => {
      if (err) {
        return res.status(400).json({
          error: "you are not authorize to update",
        });
      }
      
      return res.json(classes);
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
