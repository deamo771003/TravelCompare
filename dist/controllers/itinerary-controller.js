"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itinerary_service_1 = __importDefault(require("../services/itinerary-service"));
const itineraryController = {
    getIndexData: (req, res, next) => {
        itinerary_service_1.default.getIndexData(req, (err, data) => {
            if (err) {
                next(err);
            }
            else {
                res.status(200).json(data);
            }
        });
    }
};
exports.default = itineraryController;
