// import dotenv from 'dotenv'
// dotenv.config()

function getEnvOrSecret(key: string): string {
  const value = process.env[key];
  if (value) {
    return value;
  }
  throw new Error(`Environment variable ${key} is not defined`)
}

export const config = {
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


