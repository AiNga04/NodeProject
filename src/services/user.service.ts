import { prisma } from "configs/client";

const handleCreateUser = async (
  username: string,
  email: string,
  password: string
) => {
  {
    const newUser = await prisma.user.create({
      data: { username, email, password },
    });
    return newUser;
  }
};

const getAllUser = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const deleteUserByID = async (id: string) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id: +id,
    },
  });
  return deleteUser;
};

const postUpdateUserByID = async (
  id: string,
  username: string,
  email: string,
  password: string
) => {
  const updateUser = await prisma.user.update({
    where: {
      id: +id,
    },
    data: { username, email, password },
  });

  return updateUser;
};

const getUserByID = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });
  return user;
};

export {
  handleCreateUser,
  getAllUser,
  deleteUserByID,
  postUpdateUserByID,
  getUserByID,
};
