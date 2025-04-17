import User from "models/user.model";

const handleCreateUser = async (
  username: string,
  email: string,
  password: string,
  address: string,
  image: string,
  description: string
) => {
  await User.create({ username, email, password, address, image, description });
};

const getAllUser = async () => {
  const users = await User.find({}).exec();
  return users;
};

const deleteUserByID = async (id: string) => {
  await User.deleteOne({ _id: id });
};

const postUpdateUserByID = async (
  id: string,
  username: string,
  email: string,
  password: string,
  address: string,
  image: string,
  description: string
) => {
  const updateUser = await User.updateOne(
    { _id: id },
    { username, email, password, address, image, description }
  );

  return updateUser;
};

const getUserByID = async (id: string) => {
  const user = await User.findById(id).exec();
  return user;
};

export {
  handleCreateUser,
  getAllUser,
  deleteUserByID,
  postUpdateUserByID,
  getUserByID,
};
