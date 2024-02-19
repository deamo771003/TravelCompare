"use strict";
// import dotenv from 'dotenv'
// dotenv.config()
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
function getEnvOrSecret(key) {
    const value = process.env[key];
    if (value) {
        return value;
    }
    throw new Error(`Environment variable ${key} is not defined`);
}
exports.config = {
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
