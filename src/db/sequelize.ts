import { Sequelize } from "sequelize-typescript"
const config = require("../config/config")

const env = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: "mssql",
  models: [__dirname + './models'], // 指定模型文件的路徑
  dialectOptions: {
    options: {
      encrypt: true, // 使用 Azure SQL 時需要
      trustServerCertificate: true // 自簽名證書時需要
    }
  }
})

export { sequelize }