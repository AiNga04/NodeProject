import dotenv from "dotenv";
import express from "express";
import connection from "configs/database.config";
import fileUpload from "express-fileupload";
import apiRoutes from "./routes/api";

dotenv.config();

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || "localhost";

// Config req.body
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Config file upload
app.use(
    fileUpload({
        limits: {fileSize: 500 * 1024 * 1024}, // Giới hạn kích thước file
        useTempFiles: true, // Sử dụng file tạm
        tempFileDir: "/tmp/", // Thư mục lưu file tạm
        createParentPath: true, // Tự động tạo thư mục nếu chưa tồn tại
    })
);

//Config static file
app.use(express.static("public"));

// Routes
apiRoutes(app);

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
