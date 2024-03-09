"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    sendResponses(res, data, statusCode = 200) {
        res.status(statusCode).json(data);
    }
}
exports.BaseController = BaseController;
