import dotenv from 'dotenv'
dotenv.config()

interface configInterface {
  database: string
  username: string
  password: string
  host: string
  dialect: 'mssql'
  port?: number
}

function getEnvOrSecret(env: string): string {
  const value = process.env[env]
  if (value) {
    return value;
  }
  throw new Error(`Environment variable ${env} is not defined`)
}

const config: Record<string, configInterface> = {
  development: {
    database: getEnvOrSecret('DB_DATABASE'),
    username: getEnvOrSecret('DB_USERNAME'),
    password: getEnvOrSecret('DB_PASSWORD'),
    host: getEnvOrSecret('DB_HOST'),
    dialect: 'mssql',
    port: 1433,
  },
  production: {
    host: getEnvOrSecret('AWS_DB_HOST'),
    username: getEnvOrSecret('AWS_DB_USERNAME'),
    password: getEnvOrSecret('AWS_DB_PASSWORD'),
    database: getEnvOrSecret('AWS_DB_DATABASE'),
    dialect: 'mssql',
  },
};

module.exports = config