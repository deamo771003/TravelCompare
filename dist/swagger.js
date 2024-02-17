"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// URL後方加上api-docs = swagger page
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const port = process.env.PORT || 3000;
const url = process.env.AWS_URL || `http://localhost:${port}`;
const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'TravelCompare API',
            version: '1.0.0',
            description: 'API Description',
        },
        servers: [
            {
                url: url,
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
