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
    url = 'https://www.travelcompare.store';
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
            description: `Domain: ${url}`,
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
