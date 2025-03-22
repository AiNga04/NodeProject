import User from "models/user.model";

const handleCreateUser = async (
  username: string,
  email: string,
  password: string
) => {
  User.create({ username, email, password });
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
  password: string
) => {
  const updateUser = await User.updateOne(
    { _id: id },
    {
      username: username,
      email: email,
      password: password,
    }
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
