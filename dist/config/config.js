"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
require('dotenv').config();
const getCloudSecurity_1 = require("../helpers/getCloudSecurity");
function getEnvOrThrow(envVar) {
    const value = process.env[envVar];
    if (!value) {
        throw new Error(`${envVar} undefined`);
    }
    return value;
}
function getConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            development: {
                database: getEnvOrThrow('DB_DATABASE'),
                username: getEnvOrThrow('DB_USERNAME'),
                password: getEnvOrThrow('DB_PASSWORD'),
                host: getEnvOrThrow('DB_HOST'),
                dialect: 'mssql',
                port: Number(process.env.DB_PORT) || 1433,
                seederStorage: "sequelize",
                seederStorageTableName: "sequelize_seed",
                seederStoragePath: 'dist/db/seeders',
            },
            production: {
                database: yield (0, getCloudSecurity_1.getSecret)('DB_DATABASE'),
                username: yield (0, getCloudSecurity_1.getSecret)('DB_USERNAME'),
                password: yield (0, getCloudSecurity_1.getSecret)('DB_PASSWORD'),
                host: yield (0, getCloudSecurity_1.getSecret)('DB_HOST'),
                dialect: 'mssql',
                port: Number(process.env.DB_PORT) || 1433,
                seederStorage: "sequelize",
                seederStorageTableName: "sequelize_seed",
                seederStoragePath: 'dist/db/seeders',
            }
        };
    });
}
exports.getConfig = getConfig;
