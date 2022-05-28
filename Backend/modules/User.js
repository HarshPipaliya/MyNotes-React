const mongoose = require("mongoose")
const { Schema } = mongoose;


//Creating a user schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        default:"General"
    },
    date:{
        type:Date,
        default: Date.now
    }
  });

  const User = mongoose.model("user",UserSchema);
  module.exports = User