"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itinerary_service_1 = __importDefault(require("../services/itinerary-service"));
class BaseController {
    sendResponses(res, data, statusCode = 200) {
        res.status(statusCode).json(data);
    }
}
class ItineraryController extends BaseController {
    constructor() {
        super(...arguments);
        this.getIndexData = (req, res, next) => {
            itinerary_service_1.default.getIndexData(req, (err, data) => {
                if (err) {
                    next(err);
                }
                else {
                    this.sendResponses(res, data);
                }
            });
        };
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
exports.default = new ItineraryController();
