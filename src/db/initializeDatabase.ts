import { sequelize } from "./sequelize"
import { User } from './models/User'

export async function initializeDatabase() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    sequelize.addModels([User]) // 添加所有模型
    await sequelize.sync() // 如果表格已存在，使用 { force: true } 来覆盖它
    console.log('Table created successfully.')
    
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}