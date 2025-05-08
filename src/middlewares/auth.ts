import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const while_lists = ["/", "/auth/register", "/auth/login"];

  console.log("Request URL:", req.path);

  if (while_lists.find((item) => item === req.path)) {
    return next(); // Chỉ gọi next() nếu URL nằm trong danh sách trắng
  }

  if (req?.headers?.authorization?.split(" ")?.[1]) {
    const token = req.headers.authorization.split(" ")[1];
    // Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("token:", token);
      console.log("decoded:", decoded);
      return next(); // Chỉ gọi next() nếu token hợp lệ
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "401 Unauthorized",
    });
  }
}
