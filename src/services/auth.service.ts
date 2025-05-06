import User from "../models/user.model";
import bcrypt from "bcrypt";

const handleRegister = async (
  username: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: number,
  gender: string,
  address: string,
  description: string,
  roleId: string,
  positionId: string
) => {
  const existingUser = await User.findOne({
    $or: [{ email }, { username }, { phone }],
  });

  if (existingUser) {
    throw new Error("User already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phone,
    gender,
    address,
    description,
    roleId,
    positionId,
  });

  return newUser;
};

const handleLogin = async (username: string, password: string) => {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("User not found!");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password!");
  }

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    gender: user.gender,
    address: user.address,
    description: user.description,
    roleId: user.roleId,
    positionId: user.positionId,
  };
};

export { handleRegister, handleLogin };
