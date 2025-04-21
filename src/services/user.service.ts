import User from "../models/user.model";
import bcrypt from "bcrypt";

const createUser = async (
  username: string,
  email: string,
  password: string,
  address: string,
  image: string,
  description: string
) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    address,
    image,
    description,
  });

  return newUser;
};

const getAllUsers = async () => {
  return await User.find({}).exec();
};

const getUserById = async (id: string) => {
  return await User.findById(id).exec();
};

const updateUserById = async (
  id: string,
  username: string,
  email: string,
  password: string,
  address: string,
  image: string,
  description: string
) => {
  return await User.findByIdAndUpdate(
    id,
    { username, email, password, address, image, description },
    { new: true }
  ).exec();
};

const deleteUserById = async (id: string) => {
  return await User.findByIdAndDelete(id).exec();
};

export { createUser, getAllUsers, getUserById, updateUserById, deleteUserById };
