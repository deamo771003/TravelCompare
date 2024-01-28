export interface ConfigAttributes {
  database: string;
  username: string;
  password: string;
  host: string;
  dialect: string;
  port: number;
  seederStorage: string;
  seederStorageTableName: string;
  seederStoragePath: string;
}

export interface ConfigKeyAttribute {
  [Key: string]: ConfigAttributes
} 