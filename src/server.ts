import "reflect-metadata";
import "dotenv/config";
import { createExpressServer } from "routing-controllers";
import express from "express";
import TestController from "./controller/TestController";
import { MySQLDataSource } from "./dataBase";

const app: any = createExpressServer({
    cors: true,
    routePrefix: "/api",
    controllers: [TestController],
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