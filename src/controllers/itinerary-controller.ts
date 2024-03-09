import { Request, Response, NextFunction } from 'express'
import { CallbackError } from '../interfaces/error-interface'
import itineraryService from '../services/itinerary-service'

interface getIndexData {
  id: number
  name: string
  startDate: string
  endDate: string
  cost: number
  details: string
  image: string
  formed: boolean,
  originName: string
  countryName: string
  agencyName: string
  favoriteCount: number
}

class BaseController {
  protected sendResponses(res: Response, data?: object, statusCode: number = 200): void {
    res.status(statusCode).json(data)
  }
}

class ItineraryController extends BaseController {
  public getIndexData(req: Request, res: Response, next: NextFunction): void {
    itineraryService.getIndexData(req, (err: CallbackError | null, data?: getIndexData[]) => {
      if (err) {
        next(err)
      } else {
        this.sendResponses(res, data)
      }
    })
  }
}
// const itineraryController = {
//   getIndexData: (req: Request, res: Response, next: NextFunction) => {
//     itineraryService.getIndexData(req, (err: CallbackError | null, data?: getIndexData) => {
//       if (err) {
//         next(err)
//       } else {
//         res.status(200).json(data)
//       }
//     })
//   }
// }

export default new ItineraryController