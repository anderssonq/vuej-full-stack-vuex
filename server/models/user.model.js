const mongoose = require("mongoose"),
  { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", UserSchema);
