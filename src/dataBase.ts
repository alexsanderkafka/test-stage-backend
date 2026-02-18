import { DataSource } from "typeorm";
import "dotenv/config";

export const MySQLDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "username",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "db_name",
    //entities: [],
    logging: true
});