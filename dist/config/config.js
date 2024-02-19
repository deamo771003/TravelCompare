"use strict";
// import dotenv from 'dotenv'
// dotenv.config()
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConfig = void 0;
// function getEnvOrSecret(key: string): string {
//   const value = process.env[key];
//   if (value) {
//     return value;
//   }
//   throw new Error(`Environment variable ${key} is not defined`)
// }
// export const config = {
//   development: {
//     database: getEnvOrSecret('DB_DATABASE'),
//     username: getEnvOrSecret('DB_USERNAME'),
//     password: getEnvOrSecret('DB_PASSWORD'),
//     host: getEnvOrSecret('DB_HOST'),
//     dialect: 'mssql' as const,
//     port: 1433
//   },
//   production: {
//     host: getEnvOrSecret('AWS_DB_HOST'),
//     username: getEnvOrSecret('AWS_DB_USERNAME'),
//     password: getEnvOrSecret('AWS_DB_PASSWORD'),
//     database: getEnvOrSecret('AWS_DB_DATABASE'),
//     dialect: 'mssql' as const
//   }
// }
// config.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getEnvOrSecret(key) {
    const value = process.env[key];
    if (value) {
        return value;
    }
    throw new Error(`Environment variable ${key} is not defined`);
}
// 定义一个函数来获取数据库配置
function getDatabaseConfig(env) {
    const configs = {
        development: {
            database: getEnvOrSecret('DB_DATABASE'),
            username: getEnvOrSecret('DB_USERNAME'),
            password: getEnvOrSecret('DB_PASSWORD'),
            host: getEnvOrSecret('DB_HOST'),
            dialect: 'mssql',
            port: 1433
        },
        production: {
            host: getEnvOrSecret('AWS_DB_HOST'),
            username: getEnvOrSecret('AWS_DB_USERNAME'),
            password: getEnvOrSecret('AWS_DB_PASSWORD'),
            database: getEnvOrSecret('AWS_DB_DATABASE'),
            dialect: 'mssql'
        }
    };
    return configs[env];
}
exports.getDatabaseConfig = getDatabaseConfig;
