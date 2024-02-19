"use strict";
// // URL後方加上api-docs = swagger page
// import swaggerJsdoc from 'swagger-jsdoc'
// import dotenv from 'dotenv'
// dotenv.config()
// import { loadSecrets } from './helpers/loadSecrets'
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
// const port = process.env.PORT || 3000
// const localUrl = `http://localhost:${port}`
// const awsUrl = process.env.AWS_URL
// const options = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'TravelCompare API',
//       version: '1.0.0',
//       description: 'API Description',
//     },
//     servers: [
//       {
//         url: localUrl,
//         description: 'Local server',
//       },
//       {
//         url: awsUrl,
//         description: 'AWS EC2 server',
//       },
//     ],
//   },
//   apis: ['./src/routes/**/*.ts'],
// };
// const swaggerSpec = swaggerJsdoc(options);
// export default swaggerSpec;
// 在您的应用入口文件中，比如 app.js 或者 index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const loadSecrets_1 = require("./helpers/loadSecrets");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const routes_1 = __importDefault(require("./routes")); // 假设您的路由配置在这里
dotenv_1.default.config();
function initializeApp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, loadSecrets_1.loadSecrets)(); // 确保在进行任何配置之前加载秘密
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
        const app = (0, express_1.default)();
        // 设置 Swagger UI
        app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
        // 设置您的路由
        app.use(routes_1.default);
        // 其他中间件和路由配置...
        app.listen(port, () => {
            console.log(`Express server is running on PORT:${port}`);
        });
    });
}
initializeApp().catch(error => {
    console.error('Failed to initialize the app:', error);
});
