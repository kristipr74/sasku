import mysql from "mysql2";
import config from "./config";

const pool = mysql
  .createPool({
    host: config.db.host,
    user: config.db.user,
    database: "sasku",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

export default pool;
