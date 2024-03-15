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

export interface UserData {
  id: number
  email: string
  name: string
  admin: boolean
  create_at: Date
}

export interface SignInData {
  token: string
  userData: UserData
}

export interface SignInDataSuccessRes {
  status: string
  data: SignInData
}