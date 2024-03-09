"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnvOrSecret(env) {
    const value = process.env[env];
    if (value) {
        return value;
    }
    throw new Error(`Environment variable ${env} is not defined`);
}
const config = {
    development: {
        database: getEnvOrSecret('DB_DATABASE'),
        username: getEnvOrSecret('DB_USERNAME'),
        password: getEnvOrSecret('DB_PASSWORD'),
        host: getEnvOrSecret('DB_HOST'),
        dialect: 'mssql',
        port: 1433,
    },
    production: {
        host: getEnvOrSecret('AWS_DB_HOST'),
        username: getEnvOrSecret('AWS_DB_USERNAME'),
        password: getEnvOrSecret('AWS_DB_PASSWORD'),
        database: getEnvOrSecret('AWS_DB_DATABASE'),
        dialect: 'mssql',
    },
};
module.exports = config;
