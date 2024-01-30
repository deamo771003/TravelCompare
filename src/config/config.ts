require('dotenv').config()
// import { getSecret } from '../helpers/getCloudSecurity'
import { ConfigKeyAttribute } from '../interfaces/config-interface'

function getEnvOrThrow(envVar: string): string {
  const value = process.env[envVar]
  if (!value) {
    throw new Error(`${envVar} undefined`)
  }
  return value as string;
}

export function getConfig(): ConfigKeyAttribute {
  return {
    development: {
      database: getEnvOrThrow('DB_DATABASE'),
      username: getEnvOrThrow('DB_USERNAME'),
      password: getEnvOrThrow('DB_PASSWORD'),
      host: getEnvOrThrow('DB_HOST'),
      dialect: 'mssql',
      port: 1433,
      seederStorage: "sequelize",
      seederStorageTableName: "sequelize_seed",
      seederStoragePath: 'dist/db/seeders',
    },
    production: {
      // database: await getSecret('DB_DATABASE'),
      // user: await getSecret('DB_USERNAME'),
      // password: await getSecret('DB_PASSWORD'),
      // server: await getSecret('DB_HOST'),
      // port: parseInt('1433'),
      dialect: 'mssql',
      host: getEnvOrThrow('DB_HOST'),
      username: getEnvOrThrow('DB_USERNAME'),
      password: getEnvOrThrow('DB_PASSWORD'),
      database: getEnvOrThrow('DB_DATABASE')
    }
  }
}

