export interface ConfigInterface {
  development: DatabaseConfig;
  production: DatabaseConfig;
}

export interface DatabaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  dialect: 'mssql';
  port?: number;
}