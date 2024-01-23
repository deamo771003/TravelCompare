import { User } from '../db/models/user'

interface SignUpInfo {
  name: string
  password: string
}

interface User {
  name: string
  password: string
}

interface SignUpResponse {
  status: string
  user: User
}

interface CallbackError extends Error {
  name: string
  password: string
}

const userServices = {

}

export default userServices