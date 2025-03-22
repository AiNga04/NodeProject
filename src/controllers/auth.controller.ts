import { Request, Response } from "express";

const getLoginPage = (req: Request, res: Response) => {
  res.render("auth.login.ejs");
};
const getRegisterPage = (req: Request, res: Response) => {
  res.render("auth.register.ejs");
};
export { getLoginPage, getRegisterPage };
