import { Sequelize } from 'sequelize-typescript'
import { User } from './user'
const config = require("../../config/config")

const env = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

const sequelize = new Sequelize({
  ...dbConfig,
  dialect: "mssql",
  models: [User], // 指定模型文件的路徑
  dialectOptions: {
    options: {
      encrypt: true, // 使用 Azure SQL 時需要
      trustServerCertificate: true // 自簽名證書時需要
    }
  }
})

export async function initializeDatabase() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    await sequelize.sync() // 如果表格已存在，使用 { force: true } 来覆盖它
    console.log('Table created successfully.')
    
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { sequelize };
export * from './user';