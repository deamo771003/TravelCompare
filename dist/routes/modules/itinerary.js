"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const itinerary_controller_1 = __importDefault(require("../../controllers/itinerary-controller"));
/**
 * @swagger
 * /itinerary/getIndexData:
 *   get:
 *     summary: get index data
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 */
router.get('/getIndexData', itinerary_controller_1.default.getIndexData);
exports.default = router;
