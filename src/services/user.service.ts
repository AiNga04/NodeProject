import User from "../models/user.model";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import aqp from 'api-query-params';

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

const getAllUsers = async (queryString: object) => {
  const totalRecords = await User.countDocuments();
  // @ts-ignore
  const limit = parseInt(queryString.limit as string) || 0;
  // @ts-ignore
  const page = parseInt(queryString.page as string) || 0;

  if (limit && page) {
    const offset = (page - 1) * limit

    // @ts-ignore
    const { filter } = aqp(queryString);
    delete filter.page;

    const users = await User.find(filter).skip(offset).limit(limit).exec();
    return { users, totalRecords, limit, page };
  } else {
    const users = await User.find({}).exec();
    return { users, totalRecords };
  }
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

// Function to soft delete a user by ID
const softDeleteUserById = async (id: string) => {
  try {
    // Validate the ID format (MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID");
    }

    // @ts-ignore
    const user = await User.deleteById(id);

    return user;
  } catch (err) {
    console.error("Error in softDeleteUserById:", err);
    throw err;
  }
};

const uploadImageById = async (id: string, image: string) => {
  return await User.findByIdAndUpdate(id, { image }, { new: true }).exec();
};

const createListUsers = async (listUsers) => {
  try {
    const result = await User.insertMany(listUsers, { rawResult: true });
    return result;
  } catch (err) {
    console.error("Error in createListUsers:", err);
    return null;
  }
};

const softDeleteListId = async (listIds: string[]) => {
  try {
    // Kiểm tra xem danh sách ID có hợp lệ không
    if (!listIds || !Array.isArray(listIds) || listIds.length === 0) {
      throw new Error("Invalid input: listIds must be a non-empty array");
    }

    // Thực hiện soft delete
    const result = await User.deleteMany({ _id: { $in: listIds } });

    return result;
  } catch (err) {
    console.error("Error in softDeleteListId:", err);
    throw err;
  }
};

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  uploadImageById,
  createListUsers,
  softDeleteUserById,
  softDeleteListId,
};
