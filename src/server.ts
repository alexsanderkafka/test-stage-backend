import "reflect-metadata";
import "dotenv/config";
import { createExpressServer } from "routing-controllers";
import express from "express";
import TestController from "./controller/TestController";

const app: any = createExpressServer({
    cors: true,
    routePrefix: "/api",
    controllers: [TestController],
    classTransformer: true
});

app.use(express.json());

const PORT: number = parseInt(process.env.SERVER_PORT || "8080", 10);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});