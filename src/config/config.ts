require('dotenv').config()
import { getSecret } from '../helpers/getCloudSecurity'
import { ConfigKeyAttribute } from '../interfaces/config-interface'

function getEnvOrThrow(envVar: string): string {
  const value = process.env[envVar]
  if (!value) {
    throw new Error(`${envVar} undefined`)
  }
  return value;
}

export async function getConfig(): Promise<ConfigKeyAttribute> {
  return {
    development: {
      database: getEnvOrThrow('DB_DATABASE'),
      username: getEnvOrThrow('DB_USERNAME'),
      password: getEnvOrThrow('DB_PASSWORD'),
      host: getEnvOrThrow('DB_HOST'),
      dialect: 'mssql',
      port: Number(process.env.DB_PORT) || 1433,
      seederStorage: "sequelize",
      seederStorageTableName: "sequelize_seed",
      seederStoragePath: 'dist/db/seeders',
    },
    production: {
      database: await getSecret('DB_DATABASE'),
      username: await getSecret('DB_USERNAME'),
      password: await getSecret('DB_PASSWORD'),
      host: await getSecret('DB_HOST'),
      dialect: 'mssql',
      port: Number(process.env.DB_PORT) || 1433,
      seederStorage: "sequelize",
      seederStorageTableName: "sequelize_seed",
      seederStoragePath: 'dist/db/seeders',
    }
  }
}

