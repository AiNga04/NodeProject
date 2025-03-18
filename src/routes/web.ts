import express, { Router, Express } from "express";
import { getHomePage } from "../controllers/home.controller";
import { getLoginPage } from "../controllers/login.controller";
import {getCreateUserPage} from "../controllers/user.controller";

// Khởi tạo router
const router: Router = express.Router();

const webRoutes = (app: Express) =>{
    // Định nghĩa các route
    router.get("/", getHomePage);
    router.get("/auth/login", getLoginPage);
    router.get("/user/create", getCreateUserPage);

    app.use("/", router);
}

export default webRoutes;
