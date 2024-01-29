"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.initializeDatabase = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const config_1 = require("../../config/config");
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const env = process.env.NODE_ENV || 'development';
        const config = yield (0, config_1.getConfig)();
        const dbConfig = config[env];
        exports.sequelize = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({}, dbConfig), { dialect: "mssql", models: [user_1.User], dialectOptions: {
                socketPath: process.env.INSTANCE_CONNECTION_NAME,
                options: {
                    // encrypt: true,
                    trustServerCertificate: false
                }
            } }));
        try {
            yield exports.sequelize.authenticate();
            console.log('Connection has been established successfully.');
            yield exports.sequelize.sync(); // 如果表格已存在，使用 { force: true } 来覆盖它
            console.log('Table created successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
exports.initializeDatabase = initializeDatabase;
__exportStar(require("./user"), exports);
