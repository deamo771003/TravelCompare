import { Request, Response, NextFunction } from 'express'
import { CallbackError } from '../interfaces/error-interface'

// api用Error
export const apiErrorHandler = (err: CallbackError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(err.status || 500).json({
      status: 'error',
      message: err.message
    })
  } else {
    res.status(500).json({
      status: 'error',
      message: `${err}`
    })
  }
}
