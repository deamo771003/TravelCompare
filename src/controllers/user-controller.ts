import { Request, Response, NextFunction } from 'express'
import userService from '../services/user-service'
import { SignUpInfo, SignUpResponse } from '../interfaces/user-interface'
import { CallbackError } from '../interfaces/error-interface'
import { BaseController } from './baseController'

interface signInUserData {
  email: string
}

interface signInData {
  token: number
  userData: signInUserData
}

class userController extends BaseController {
  public signup = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const signUpInfo: SignUpInfo = { username, password };
    userService.signup(signUpInfo, (err: CallbackError | null, data?: SignUpResponse) => {
      err ? next(err) : this.sendResponses(res, data)
    })
  }

  public signIn = (req: Request, res: Response, next: NextFunction) => {
    userService.signIn(req, (err: CallbackError | null, data?: signInData) => {
      err ? next(err) : this.sendResponses(res, data)
    })
  }
}

export default new userController()