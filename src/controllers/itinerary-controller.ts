import { Request, Response, NextFunction } from 'express'
import { CallbackError } from '../interfaces/error-interface'
import itineraryService from '../services/itinerary-service'
import { BaseController } from './baseController'
import { GetIndexDataSuccessRes } from '../interfaces/itinerary-interface'

class ItineraryController extends BaseController {
  public getIndexData = (req: Request, res: Response, next: NextFunction): void => {
    itineraryService.getIndexData(req, (err?: CallbackError | null, data?: GetIndexDataSuccessRes) => {
      if (err) {
        next(err)
      } else {
        this.sendResponses(res, data)
      }
    })
  }
}

export default new ItineraryController()