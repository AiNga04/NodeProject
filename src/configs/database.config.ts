// Get the client
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const getConnection = async () => {
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: process.env.HOST_NAME || "localhost",
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    port: +process.env.DB_PORT || 3307,
    database: process.env.BD_NAME || "",
  });

  return connection;
};

export default getConnection;
