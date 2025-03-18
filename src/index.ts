import dotenv from "dotenv";
import express from "express";
import viewEngineConfig from "./configs/view.engine.config";
import webRoutes from "./routes/web";

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || "localhost";

// Config template engine
viewEngineConfig(app);

//config req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Config static file
app.use(express.static("public"));

// Routes
webRoutes(app);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
