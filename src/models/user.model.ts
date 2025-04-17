import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: String,
  email: {
    type: String,
    require: true
  },
  address: String,
  image: String,
  description: String

}, { timestamps: true });

const User = mongoose.model("users", userSchema);

export default User;
