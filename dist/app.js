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
const config_1 = require("./config/config");
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    const config = yield (0, config_1.getConfig)();
    console.log(config);
}))();
