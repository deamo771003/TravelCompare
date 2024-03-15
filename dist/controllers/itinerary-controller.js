"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itinerary_service_1 = __importDefault(require("../services/itinerary-service"));
const baseController_1 = require("./baseController");
class ItineraryController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.getIndexData = (req, res, next) => {
            itinerary_service_1.default.getIndexData(req, (err, data) => {
                err ? next(err) : this.sendResponses(res, data);
            });
        };
    }
}
exports.default = new ItineraryController();
