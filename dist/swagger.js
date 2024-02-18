"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// URL後方加上api-docs = swagger page
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const localUrl = `http://localhost:${port}`;
const awsUrl = process.env.AWS_URL;
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
                url: localUrl,
                description: 'Local server',
            },
            {
                url: process.env.AWS_URL,
                description: 'AWS EC2 server',
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
