import User from "../models/user.model";
import bcrypt from "bcrypt";

const handleRegister = async (
  username: string,
  email: string,
  password: string,
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
  }

  // Trả về thông tin người dùng nếu đăng nhập thành công
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    address: user.address,
    description: user.description,
  };
};

export { handleRegister, handleLogin };
