import dotenv from 'dotenv'
dotenv.config()
import { loadSecrets } from '../helpers/loadSecrets'

async function getEnvOrSecret(key: string): Promise<string> {
  await loadSecrets()
  console.log(process.env.AWS_DB_HOST)
  const value = process.env[key];
  if (value) {
    return value;
  }
  throw new Error(`Environment variable ${key} is not defined`)
}

module.exports = {
  development: {
    database: getEnvOrSecret('DB_DATABASE'),
    username: getEnvOrSecret('DB_USERNAME'),
    password: getEnvOrSecret('DB_PASSWORD'),
    host: getEnvOrSecret('DB_HOST'),
    dialect: 'mssql' as const,
    port: 1433
  },
  production: {
    host: getEnvOrSecret('AWS_DB_HOST'),
    username: getEnvOrSecret('AWS_DB_USERNAME'),
    password: getEnvOrSecret('AWS_DB_PASSWORD'),
    database: getEnvOrSecret('AWS_DB_DATABASE'),
    dialect: 'mssql' as const
  }
}