import express, { Router, Express } from "express";
import {
  getUsers,
  getUser,
  createUserHandler,
  updateUser,
  deleteUser,
  uploadImageUser,
  createListUsersHandle,
  softDeleteUser,
  softDeleteListUser,
} from "../controllers/user.controller";
import { postRegister, postLogin } from "../controllers/auth.controller";
import { uploadImage, uploadImages } from "../controllers/upload.controller";

const router: Router = express.Router();

const apiRoutes = (app: Express) => {
  //Auth
  router.post("/auth/register", postRegister);
  router.post("/auth/login", postLogin);

  //User
  router.get("/users", getUsers);
  // @ts-ignore
  router.get("/users/:id", getUser);
  router.post("/users", createUserHandler);
  // @ts-ignore
  router.put("/users/:id", updateUser);
  // @ts-ignore
  router.delete("/users/:id", deleteUser);
  // @ts-ignore
  router.delete("/users/soft-delete/:id", softDeleteUser);
  // @ts-ignore
  router.post("/users/soft-delete-list", softDeleteListUser);
  // @ts-ignore
  router.put("/users/upload/:id", uploadImageUser);
  // @ts-ignore
  router.post("/users/list", createListUsersHandle);
  // @ts-ignore
  router.post("/users/soft-delete-list", softDeleteListUser);

  //Upload
  // @ts-ignore
  router.post("/upload/image", uploadImage);
  router.post("/upload/images", uploadImages);

  app.use("/v1/api/", router);
};

export default apiRoutes;
