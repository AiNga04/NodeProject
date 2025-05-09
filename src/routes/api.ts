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
import {
  createEmtyProject,
  getAllProjects,
  updateProject,
  deleteProject,
  softDeleteProject,
  softDeleteListProjects,
} from "../controllers/project.controller";
import { postRegister, postLogin } from "../controllers/auth.controller";
import { uploadImage, uploadImages } from "../controllers/upload.controller";
import {
  createTaskHandler,
  getAllTasksHandler,
  updateTask,
  deleteTask,
  softDeleteTask,
  softDeleteListTasks,
} from "../controllers/task.controller";
import auth from "middlewares/auth";
import { getAccount } from "../controllers/user.controller";

const router: Router = express.Router();

const apiRoutes = (app: Express) => {
  router.all("*", auth);

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

  //Project
  router.post("/projects", createEmtyProject);
  router.get("/projects", getAllProjects);
  // @ts-ignore
  router.put("/projects/:id", updateProject);
  // @ts-ignore
  router.delete("/projects/:id", deleteProject);
  // @ts-ignore
  router.delete("/projects/soft-delete/:id", softDeleteProject);
  // @ts-ignore
  router.post("/projects/soft-delete-list", softDeleteListProjects);

  //Task
  router.post("/tasks", createTaskHandler);
  router.get("/tasks", getAllTasksHandler);
  // @ts-ignore
  router.put("/tasks/:id", updateTask);
  // @ts-ignore
  router.delete("/tasks/:id", deleteTask);
  // @ts-ignore
  router.delete("/tasks/soft-delete/:id", softDeleteTask);
  // @ts-ignore
  router.post("/tasks/soft-delete-list", softDeleteListTasks);

  //account
  router.get("/account", getAccount);

  app.use("/v1/api/", router);
};

export default apiRoutes;
