const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require('uuid/v1');
const {ObjectId} = mongoose.Schema;

const StudentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
           
            trim: true
        },
        email: {
            type: String,
            required: true,
            
            trim: true   
        },
        encry_password: {
            type: String,
            required: true
     
       },
       salt: String,
       
        batch: {
            type: Number,
            required : true
        },
        
        rollno: {
            type: Number,
            required : true
        },
        branch : {
            type: String,
            required : true,
            
        },
        
        
       enrolledClasses : {
        type: Array,
        default: []
    }
       
    }
);


StudentSchema.virtual("password")
  .set(function(password){
      this._password = password;
      this.salt = uuidv1();
      this.encry_password = this.securePassword(password);
  })
  .get(function(){
      return this._password;
  })



StudentSchema.methods = {

    autheticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function(plainpassword){
        if(!plainpassword){
            return "";
        }
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } catch(err){
            return "";

        }
    }
}

module.exports  = mongoose.model("Student",StudentSchema);