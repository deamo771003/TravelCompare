"use strict";
// MSSQL
// 製作API
// 部署GCP
// postman
// swagger
// CI/CD
// kubernetes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const initializeDatabase_1 = require("./db/initializeDatabase");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, initializeDatabase_1.initializeDatabase)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.listen(port, () => {
    console.log(`express sever is running on http://localhost:${port}`);
});
