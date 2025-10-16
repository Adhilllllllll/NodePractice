const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:5, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid email address:" + value);
      }
    }
  },
  password: {
    type: String, 
    required: true,
    mminlength:8,
    minuppercase:1,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Enter a Strong Password" + value)
      }
    }
  },
  gender:{
    type:String,
    validate(value){
      if(!["male","female"].includes(value)){
        throw new Error("Gender data is not valid");
      }
    }
  },
  age: {
    type: Number,
    min: 1,
    max: 100,
  },
  skills:{
    type:[String],
  },
},{
    timestamps:true, // it auto crates two extra fields every docs
 }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
