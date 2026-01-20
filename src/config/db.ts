import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mysql from "mysql2/promise";

const connectDB = async () => {
  const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mysecretpassword",
  });

  await pool.getConnection().then((conn) => conn.release());

  return pool;
};

export { connectDB };

// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     username VARCHAR(50) NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL
// );
