import express, { Router, Express } from "express";
import getHomePage from "../controllers/home.controller";

const router: Router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage); // Route cho trang home
  app.use("/", router);
};

export default webRoutes;
