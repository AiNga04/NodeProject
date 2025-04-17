import dotenv from "dotenv";
import express from "express";
import viewEngineConfig from "configs/view.engine.config";
import webRoutes from "routes/web";
import connection from "configs/database.config";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || "localhost";

//config file upload
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// Config template engine
viewEngineConfig(app);

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Config static file
app.use(express.static("public"));

// Routes
webRoutes(app);

(async () => {
  try {
    await connection();
    // Start server
    app.listen(port, () => {
      console.log(`Server running at http://${hostname}:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
