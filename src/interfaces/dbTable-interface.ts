export interface origin {
  name: string;
}

export interface dbTablesKeyAttribute {
  [Key: string]: origin
}

export interface userTable {
  id: string
  email: string
  name: string
  password: string
  admin: boolean
}