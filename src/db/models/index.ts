import { Sequelize } from 'sequelize-typescript'
import _ from 'lodash'
import { getConfig } from '../../config/config'
import { User } from './user'

export async function initializeDatabase() {
  const env = process.env.NODE_ENV || 'development'
  const config = await getConfig()
  const dbConfig = config[env]
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      models: [User]
    }
  )

  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync(); // 如果表格已存在，使用 { force: true } 来覆盖它
    console.log('Table created successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export * from './user'