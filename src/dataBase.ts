import { DataSource } from "typeorm";
import "dotenv/config";
import UserEntity from "./entity/UserEntity";
import AreaEntity from "./entity/AreaEntity";
import ProcessEntity from "./entity/ProcessEntity";
import SubprocessEntity from "./entity/SubprocessEntity";
import ToolsEntity from "./entity/ToolsEntity";
import PeopleEntity from "./entity/PeopleEntity";
import DocumentationEntity from "./entity/DocumentationEntity";

export const MySQLDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME || "username",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "db_name",
    entities: [UserEntity, AreaEntity, ProcessEntity, SubprocessEntity, ToolsEntity, PeopleEntity, DocumentationEntity],
    logging: true
});