import express, { Application } from "express";
import path from "path";

const viewEngineConfig = (app: Application) => {
  app.set("views", path.join("./src", "views"));
  app.set("view engine", "ejs");

  // config static file
  app.use(express.static(path.join("./src", "public")));
};

export default viewEngineConfig;
