"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        database: process.env.DB_DATABASE || '',
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        host: process.env.DB_HOST || '',
        dialect: 'mssql',
        port: 1433
    },
    production: {
        database: process.env.DB_DATABASE || '',
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        host: process.env.DB_HOST || '',
        dialect: 'mssql'
    }
};
module.exports = config;
