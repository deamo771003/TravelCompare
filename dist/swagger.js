"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSwagger = void 0;
// URL後方加上api-docs = swagger page
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadSecrets_1 = require("./helpers/loadSecrets");
function initializeSwagger() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, loadSecrets_1.loadSecrets)();
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
                        url: awsUrl,
                        description: 'AWS EC2 server',
                    },
                ],
            },
            apis: ['./src/routes/**/*.ts'],
        };
        const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
        return swaggerSpec;
    });
}
exports.initializeSwagger = initializeSwagger;
