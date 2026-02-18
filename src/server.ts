import "reflect-metadata";
import "dotenv/config";
import { createExpressServer } from "routing-controllers";
import express from "express";
import { MySQLDataSource } from "./dataBase";
import AuthController from "./controller/AuthController";
import AreaController from "./controller/AreaController";
import ProcessController from "./controller/ProcessController";
import SubprocessController from "./controller/SubprocessController";
import ToolController from "./controller/ToolController";
import PeopleController from "./controller/PeopleController";

const app: any = createExpressServer({
    cors: true,
    routePrefix: "/api",
    controllers: [AuthController, AreaController, ProcessController, SubprocessController, ToolController, PeopleController],
    classTransformer: true
});

app.use(express.json());

const initializeDatabase = async () => {
    try{
        await MySQLDataSource.initialize();
        console.log("Data Source has been initialized!");
    }catch(error){
        console.error("Error during Data Source initialization:", error);
        process.exit(1);
    }
}

initializeDatabase();

const PORT: number = parseInt(process.env.SERVER_PORT || "8080", 10);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});