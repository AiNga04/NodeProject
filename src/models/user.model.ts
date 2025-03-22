import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  //   phone: String,
  //   isActive: Boolean,
  //   createdDate: Date,
  //   lastLoginDate: Date,
  //   lastPasswordChangeDate: Date,
});

const User = mongoose.model("users", userSchema);

export default User;
