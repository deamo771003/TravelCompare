import { Request, Response, NextFunction } from 'express'
import { CallbackError } from '../interfaces/error-interface'
import itineraryService from '../services/itinerary-service'

const itineraryController = {
  getIndexData: (req: Request, res: Response, next: NextFunction) => {
    itineraryService.getIndexData(req, (err: CallbackError | null, data?: any) => {
      if (err) {
        next(err)
      } else {
        res.status(200).json(data)
      }
    })
  }
}

export default itineraryController