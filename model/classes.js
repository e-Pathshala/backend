const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const ClassSchema = new mongoose.Schema({
  
    name : {
        type : String,
        required : true
    },

    batch: {
        type: Number,
       required : true
    },
    teacher : {
        type: ObjectId,
        ref: "Teacher"
    },
    branch : {
        type: String,
        required : true,
        
    },
    enrolledStudent : {
        type: Array,
        default: []
        
    },
    attendence : [{
        date : Date,
         count : {
             type : Array,
             required : true
         }
         }]
   

},{timestamps: true}
);



module.exports = mongoose.model("Class",ClassSchema);

