import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const handleRegister = async (
  username: string,
  email: string,
  password: string,
  role: string,
  address: string,
  description: string
) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
    address,
    description,
  });

  return newUser;
};

const handleLogin = async (username: string, password: string) => {
  // Tìm người dùng theo username
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("User not found!");
  }

  // So sánh mật khẩu
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password!");
  } else {
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      image: user.image,
      address: user.address,
      description: user.description,
    };

    const access_token = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return {
      access_token,
      id: user._id,
      username: user.username,
      email: user.email,
      address: user.address,
      role: user.role,
      image: user.image,
      description: user.description,
    };
  }
};

export { handleRegister, handleLogin };
