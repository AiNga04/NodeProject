import { Request, Response } from "express";
import { handleCreateUser } from "../services/user.service";

const getCreateUserPage = (req: Request, res: Response) => {
  res.render("user.create.ejs");
};

const postCreateUserPage = (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  handleCreateUser(username, email, password);
  res.redirect("/");
};

export { getCreateUserPage, postCreateUserPage };
