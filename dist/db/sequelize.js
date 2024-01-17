"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelize = new sequelize_typescript_1.Sequelize({
    database: 'travel_compare',
    dialect: 'mssql',
    username: 'sa',
    password: 'password',
    host: '127.0.0.1',
    port: 1433, // MSSQL 的默認端口
    models: [__dirname + '/src/db/models'], // 指定模型文件的路徑
    dialectOptions: {
        options: {
            encrypt: true, // 使用 Azure SQL 時需要
            trustServerCertificate: true // 自簽名證書時需要
        }
    }
});
exports.sequelize = sequelize;
