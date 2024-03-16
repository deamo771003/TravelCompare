import dotenv from 'dotenv'
dotenv.config();

interface DatabaseConfig {
  database: string
  username: string
  password: string
  host: string
  dialect: 'mssql'
  port?: number
}

const config: { development: DatabaseConfig; production: DatabaseConfig } = {
  development: {
    database: process.env.DB_DATABASE || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '',
    dialect: 'mssql',
    port: 1433
  },
  production: {
    database: process.env.DB_DATABASE || '',
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '',
    dialect: 'mssql'
  }
}

module.exports = config;

