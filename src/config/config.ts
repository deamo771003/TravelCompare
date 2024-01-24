require('dotenv').config();

function getEnvOrThrow(envVar: string): string {
  const value = process.env[envVar];
  if (!value) {
    throw new Error(`${envVar} undefined`);
  }
  return value;
}

const config = {
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
};

export = config;
