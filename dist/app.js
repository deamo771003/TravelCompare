"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadSecrets_1 = require("./helpers/loadSecrets");
(0, loadSecrets_1.loadSecrets)();
console.log(`AWS_DB_HOST=${process.env.AWS_DB_HOST}`);
console.log(`AWS_URL=${process.env.AWS_URL}`);
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./db/models/index");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
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
    console.log(`express sever is running on PORT:${port}`);
});
