import { Sequelize } from 'sequelize-typescript'
import { User } from './user'
import { getConfig } from '../../config/config'

export let sequelize: Sequelize;

export async function initializeDatabase() {
  const env = process.env.NODE_ENV || 'development'
  const config = await getConfig()
  const dbConfig = config[env]

  sequelize = new Sequelize({
    ...dbConfig,
    dialect: "mssql",
    models: [User],
    dialectOptions: {
      socketPath: process.env.INSTANCE_CONNECTION_NAME,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    }
  });

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
