import dotenv from 'dotenv';
dotenv.config();

interface getDatabaseConfig {
  database: string
  username: string
  password: string
  host: string
  dialect: 'mssql'
  port?: number
}

function getEnvOrSecret(key: string): string {
  const value = process.env[key];
  if (value) {
    return value;
  }
  throw new Error(`Environment variable ${key} is not defined`);
}

export function getDatabaseConfig(env: string): getDatabaseConfig { 
  const configs: { [key: string]: getDatabaseConfig } = {
    development: {
      database: getEnvOrSecret('DB_DATABASE'),
      username: getEnvOrSecret('DB_USERNAME'),
      password: getEnvOrSecret('DB_PASSWORD'),
      host: getEnvOrSecret('DB_HOST'),
      dialect: 'mssql',
      port: 1433
    },
    production: {
      host: getEnvOrSecret('AWS_DB_HOST'),
      username: getEnvOrSecret('AWS_DB_USERNAME'),
      password: getEnvOrSecret('AWS_DB_PASSWORD'),
      database: getEnvOrSecret('AWS_DB_DATABASE'),
      dialect: 'mssql'
    }
  };
  
  return configs[env as keyof typeof configs];
}
