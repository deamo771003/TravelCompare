"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = void 0;
// api用Error
const apiErrorHandler = (err, req, res, next) => {
    if (err instanceof Error) {
        res.status(err.status || 500).json({
            status: 'error',
            message: err.message
        });
    }
    else {
        res.status(500).json({
            status: 'error',
            message: `${err}`
        });
    }
};
exports.apiErrorHandler = apiErrorHandler;
