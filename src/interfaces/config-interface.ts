export interface ConfigAttributes {
  database: string;
  username: string;
  password: string;
  host: string;
  port?: number
  seederStorage?: string;
  seederStorageTableName?: string;
  seederStoragePath?: string;
  dialect: 'mssql';
}

export interface ConfigKeyAttribute {
  [Key: string]: ConfigAttributes
} 