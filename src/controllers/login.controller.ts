import {Request, Response } from "express";

const getLoginPage = (req: Request, res: Response) => {
  res.render("login.ejs");
};
export {getLoginPage};