require('dotenv').config()
import { getSecret } from '../helpers/getSecretsManager'
import { ConfigKeyAttribute } from '../interfaces/config-interface'

const secretName = 'travelCompareENV'

async function getEnvOrSecret(key: string): Promise<string> {
  // 首先從環境變量中尋找值
  const value = process.env[key];
  if (value) {
    return value;
  }
  
  // 如果環境變量中沒有，則從秘密管理員中尋找
  const secrets = await getSecret(secretName);
  const secretValue = secrets ? secrets[key] : null;
  if (!secretValue) {
    throw new Error(`${key} is undefined in both process.env and AWS Secrets Manager`);
  }
  return secretValue;
}

export async function getConfig(): Promise<ConfigKeyAttribute> {
  return {
    development: {
      database: await getEnvOrSecret('DB_DATABASE'),
      username: await getEnvOrSecret('DB_USERNAME'),
      password: await getEnvOrSecret('DB_PASSWORD'),
      host: await getEnvOrSecret('DB_HOST'),
      dialect: 'mssql',
      port: 1433,
      seederStorage: "sequelize",
      seederStorageTableName: "sequelize_seed",
      seederStoragePath: 'dist/db/seeders',
    },
    production: {
      dialect: 'mssql',
      host: await getEnvOrSecret('DB_HOST'),
      username: await getEnvOrSecret('DB_USERNAME'),
      password: await getEnvOrSecret('DB_PASSWORD'),
      database: await getEnvOrSecret('DB_DATABASE')
    }
  }
}
