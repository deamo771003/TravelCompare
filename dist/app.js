"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 部署GCP
// CI/CD
// kubernetes
let url;
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    url = 'http://localhost:';
}
else {
    url = 'https://travelcompare-412314.de.r.appspot.com/';
}
const express_1 = __importDefault(require("express"));
const index_1 = require("./db/models/index");
const routes_1 = __importDefault(require("./routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const cors_1 = __importDefault(require("cors"));
// import { getConfig } from './config/config'
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use((0, cors_1.default)());
(0, index_1.initializeDatabase)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`express sever is running on ${url}${port}`);
});
// (async () => {
//     const config = await getConfig();
//     console.log(config);
// })();
