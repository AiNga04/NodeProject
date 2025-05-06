import dotenv from "dotenv";
import express from "express";
import connection from "configs/database.config";
import fileUpload from "express-fileupload";
import apiRoutes from "./routes/api";
import webRoutes from "./routes/web";
import * as process from "node:process";

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || "localhost";
// const uri = process.env.HOST_NAME_WITH_MONGODB_DRIVER;

// Config req.body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Cấu hình view engine (EJS)
app.set("view engine", "ejs");
app.set("views", "./src/views"); // Thư mục chứa file giao diện

// Config file upload
app.use(
  fileUpload({
    limits: { fileSize: 500 * 1024 * 1024 }, // Giới hạn kích thước file
    useTempFiles: true, // Sử dụng file tạm
    tempFileDir: "/tmp/", // Thư mục lưu file tạm
    createParentPath: true, // Tự động tạo thư mục nếu chưa tồn tại
  })
);

//Config static file
app.use(express.static("public"));

// Routes
webRoutes(app); // Thêm route cho trang home
apiRoutes(app);

(async () => {
  try {
    // connection with mongoose
    await connection();

    // // connection with mongodb driver
    // const client = new MongoClient(process.env.HOST_NAME_WITH_MONGODB_DRIVER);
    // try {
    //     await client.connect();
    //     const db = client.db(process.env.BD_NAME);
    //     await db.collection("customers").insertOne({ name: "Ái Nga", address: "Việt Nam" });
    //     console.log("Inserted document");
    // } catch (err) {
    //     console.error("MongoDB error:", err);
    // } finally {
    //     await client.close();
    // }

    // Start server
    app.listen(port, () => {
      console.log(`Server running at http://${hostname}:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
