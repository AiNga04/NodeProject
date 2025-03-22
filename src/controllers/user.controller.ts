import { Request, Response } from "express";
import {
  getAllUser,
  handleCreateUser,
  deleteUserByID,
  getUserByID,
  postUpdateUserByID,
} from "services/user.service";

const getCreateUserPage = (req: Request, res: Response) => {
  res.render("user.create.ejs");
};

const postCreateUserPage = (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    handleCreateUser(username, email, password);
    res.redirect("/user/list");
  } catch (error) {
    console.error(error);
  }
};

const getListUserPage = async (req: Request, res: Response) => {
  try {
    const users = await getAllUser();
    res.render("user.list.ejs", { users: users });
  } catch (error) {
    console.error(error);
  }
};

const postdeleteUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteUserByID(id);
    res.redirect("/user/list");
  } catch (error) {
    console.error(error);
  }
};

const getViewUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getUserByID(id);
    res.render("user.view.ejs", { user: user });
  } catch (error) {
    console.error(error);
  }
};

const getUpdateUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getUserByID(id);
    res.render("user.update.ejs", { user: user });
  } catch (error) {
    console.error(error);
  }
};

const postUpdateUserPage = async (req: Request, res: Response) => {
  const { id, username, email, password } = req.body;
  try {
    await postUpdateUserByID(id, username, email, password);
    res.redirect("/user/list");
  } catch (error) {
    console.error(error);
  }
};

export {
  getCreateUserPage,
  postCreateUserPage,
  getListUserPage,
  postdeleteUserPage,
  getViewUserPage,
  getUpdateUserPage,
  postUpdateUserPage,
};
