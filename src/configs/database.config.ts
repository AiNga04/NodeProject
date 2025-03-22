// Get the client
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connection = async () => {
  const options = {
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
    dbName: process.env.BD_NAME,
  };

  try {
    await mongoose.connect(process.env.DATABASE_URL, options);
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export default connection;
