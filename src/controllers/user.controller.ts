import {Request, Response} from "express";

const getCreateUserPage = (req: Request, res: Response) => {
    res.render('user.create.ejs');
}
export {getCreateUserPage};