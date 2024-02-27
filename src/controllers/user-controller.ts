import { Request, Response, NextFunction } from 'express'
import userService from '../services/user-service'
import { SignUpInfo, SignUpResponse } from '../interfaces/user-interface'
import { CallbackError } from '../interfaces/error-interface'

const userController = {
  signup: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const signUpInfo: SignUpInfo = { username, password };
    userService.signup(signUpInfo, (err: CallbackError | null, data?: SignUpResponse) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(data)
      }
    })
  },
  signIn: (req: Request, res: Response, next: NextFunction) => {
    userService.signIn(req, (err: CallbackError | null, data?: any) => err ? next(err) : res.status(200).json(data) )
  }
}

export default userController