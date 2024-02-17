export interface ConfigInterface {
  development: DatabaseConfig;
  production: DatabaseConfig;
}

interface DatabaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  dialect: 'mssql';
  port: number;
}