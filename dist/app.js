"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// MSSQL
// 製作API
// 部署GCP
// postman
// swagger
// CI/CD
// kubernetes
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express_1 = __importDefault(require("express"));
const index_1 = require("./db/models/index");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, index_1.initializeDatabase)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.listen(port, () => {
    console.log(`express sever is running on http://localhost:${port}`);
});
