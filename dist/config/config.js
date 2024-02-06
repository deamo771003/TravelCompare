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
const getSecretsManager_1 = require("../helpers/getSecretsManager");
const secretName = 'travelCompareENV';
function getEnvOrSecret(key) {
    return __awaiter(this, void 0, void 0, function* () {
        // 首先從環境變量中尋找值
        const value = process.env[key];
        if (value) {
            return value;
        }
        // 如果環境變量中沒有，則從秘密管理員中尋找
        const secrets = yield (0, getSecretsManager_1.getSecret)(secretName);
        const secretValue = secrets ? secrets[key] : null;
        if (!secretValue) {
            throw new Error(`${key} is undefined in both process.env and AWS Secrets Manager`);
        }
        return secretValue;
    });
}
function getConfig() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            development: {
                database: yield getEnvOrSecret('DB_DATABASE'),
                username: yield getEnvOrSecret('DB_USERNAME'),
                password: yield getEnvOrSecret('DB_PASSWORD'),
                host: yield getEnvOrSecret('DB_HOST'),
                dialect: 'mssql',
                port: 1433,
                seederStorage: "sequelize",
                seederStorageTableName: "sequelize_seed",
                seederStoragePath: 'dist/db/seeders',
            },
            production: {
                host: yield getEnvOrSecret('DB_HOST'),
                username: yield getEnvOrSecret('DB_USERNAME'),
                password: yield getEnvOrSecret('DB_PASSWORD'),
                database: yield getEnvOrSecret('DB_DATABASE'),
                dialect: 'mssql'
            }
        };
    });
}
exports.getConfig = getConfig;
