import { Request, Response, NextFunction } from 'express'
import userService from '../services/user-service'

const userController = {
  signup: (req: Request, res: Response, next: NextFunction) => {
    userService.signup(req, (err: Error, data: any) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(data)
      }
    })
  }
}

export default userController