import { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  uploadImageById,
  createListUsers,
  softDeleteUserById,
  softDeleteListId,
} from "../services/user.service";
import { uploadSingleFile } from "services/upload.service";

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { users, totalRecords, limit, page } = await getAllUsers(req.query);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully!",
      data: {
        page,
        limit,
        totalRecords,
        users,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// Get user by ID
const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    res.status(200).json({
      success: true,
      message: "User retrieved successfully!",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// Create a new user
const createUserHandler = async (req, res) => {
  const { username, email, password, address, description } = req.body;

  try {
    const newUser = await createUser(
      username,
      email,
      password,
      address,
      description
    );

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: newUser,
    });
  } catch (error: any) {
    if (error.message === "User already exists!") {
      res.status(409).json({
        success: false,
        message: error.message,
      });
    } else {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
};

// Update user by ID
const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password, address, image, description } = req.body;
  try {
    const updatedUser = await updateUserById(
      id,
      username,
      email,
      password,
      address,
      image,
      description
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// Delete user by ID
const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// Soft Delete user by ID
const softDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await softDeleteUserById(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "User soft deleted successfully",
      data: deletedUser,
    });
  } catch (error: any) {
    console.error("Error in softDeleteUser:", error);

    if (error.message === "Invalid user ID") {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
        data: null,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

// Update user by ID
const uploadImageUser = async (req, res) => {
  const { id } = req.params;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files were uploaded!",
    });
  }
  const result = uploadSingleFile(req.files.image);
  const image = result.data.path;
  try {
    const uploadImage = await uploadImageById(id, image);
    if (!uploadImage) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    res.status(200).json({
      success: true,
      message: "Upload image successfully!",
      data: uploadImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

// Handler to create a list of users
const createListUsersHandle = async (req: Request, res: Response) => {
  const { listUsers } = req.body;

  // Validate input
  if (!listUsers || !Array.isArray(listUsers) || listUsers.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid input: listUsers must be a non-empty array",
      data: null,
    });
  }

  try {
    const result = await createListUsers(listUsers);
    if (result) {
      return res.status(201).json({
        success: true,
        message: "List of users created successfully",
        data: result,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to create users due to an internal error",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error creating users:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};

const softDeleteListUser = async (req: Request, res: Response) => {
  const { listIds } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!listIds || !Array.isArray(listIds) || listIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid input: listIds must be a non-empty array",
    });
  }

  try {
    // Gọi service để thực hiện soft delete
    const result = await softDeleteListId(listIds);

    if (!result || result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found to soft delete",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Soft delete list processed successfully",
      data: {
        deletedCount: result.deletedCount,
      },
    });
  } catch (error) {
    console.error("Error in softDeleteListUser:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  getUsers,
  getUser,
  createUserHandler,
  updateUser,
  deleteUser,
  createListUsersHandle,
  uploadImageUser,
  softDeleteUser,
  softDeleteListUser,
};
