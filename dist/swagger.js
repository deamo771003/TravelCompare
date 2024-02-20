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
let url;
let description;
if (process.env.AWS_URL !== 'test') {
    url = 'http://ec2-35-76-107-39.ap-northeast-1.compute.amazonaws.com';
    description = 'AWS_server';
}
else {
    url = `http://localhost:${port}`;
    description = 'Local server';
}
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
                description: description,
            }
        ],
    },
    apis: ['./src/routes/**/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
