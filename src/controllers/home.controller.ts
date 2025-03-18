import { Request, Response } from "express";

const getHomePage = (req: Request, res: Response) => {
  res.render("home.ejs");
};

export {getHomePage};
