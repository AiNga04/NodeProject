import { Request, Response } from "express";
import { handleRegister, handleLogin } from "../services/auth.service";

// Create a new user
const postRegister = async (req: Request, res: Response) => {
  const { username, email, password, role, address, description } = req.body;

  try {
    const newUser = await handleRegister(
      username,
      email,
      password,
      role,
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

const postLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Gọi service để xử lý đăng nhập
    const user = await handleLogin(username, password);

    res.status(200).json({
      success: true,
      message: "Login successful!",
      data: user,
    });
  } catch (error: any) {
    if (
      error.message === "User not found!" ||
      error.message === "Invalid password!"
    ) {
      res.status(401).json({
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

export { postRegister, postLogin };
