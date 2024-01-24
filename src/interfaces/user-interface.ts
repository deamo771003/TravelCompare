export interface SignUpInfo {
  username: string;
  password: string;
}

export interface User {
  username: string
  password: string
}

export interface SignUpResponse {
  status: string
  user: User
}