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
  handleCreateUser(username, email, password);
  res.redirect("/user/list");
};

const getListUserPage = async (req: Request, res: Response) => {
  const users = await getAllUser();
  res.render("user.list.ejs", { users: users });
};

const postdeleteUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUserByID(id);
  res.redirect("/user/list");
};

const getViewUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserByID(id);
  res.render("user.view.ejs", { user: user });
};

const getUpdateUserPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserByID(id);
  res.render("user.update.ejs", { user: user });
};

const postUpdateUserPage = async (req: Request, res: Response) => {
  const { id, username, email, password } = req.body;
  await postUpdateUserByID(id, username, email, password);
  res.redirect("/user/list");
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
