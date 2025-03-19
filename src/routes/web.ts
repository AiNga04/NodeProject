import express, { Router, Express } from "express";
import { getHomePage } from "../controllers/home.controller";
import { getLoginPage } from "../controllers/login.controller";
import {
  getCreateUserPage,
  postCreateUserPage,
  getListUserPage,
  postdeleteUserPage,
  getViewUserPage,
  postUpdateUserPage,
  getUpdateUserPage,
} from "../controllers/user.controller";

// Khởi tạo router
const router: Router = express.Router();

const webRoutes = (app: Express) => {
  // Định nghĩa các route
  router.get("/", getHomePage);
  router.get("/auth/login", getLoginPage);
  router.get("/user/create", getCreateUserPage);
  router.get("/user/list", getListUserPage);
  router.post("/user/create", postCreateUserPage);
  router.post("/user/delete/:id", postdeleteUserPage);
  router.get("/user/view/:id", getViewUserPage);
  router.get("/user/update/:id", getUpdateUserPage);
  router.post("/user/update/:id", postUpdateUserPage);

  app.use("/", router);
};

export default webRoutes;
