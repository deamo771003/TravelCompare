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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const loadSecrets_1 = require("./helpers/loadSecrets");
const index_1 = require("./db/models/index");
const routes_1 = __importDefault(require("./routes"));
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const port = process.env.PORT || 3000;
        yield (0, loadSecrets_1.loadSecrets)();
        console.log(`AWS_DB_HOST=${process.env.AWS_DB_HOST}`);
        // Swagger UI
        app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
        app.use((0, cors_1.default)());
        yield (0, index_1.initializeDatabase)();
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(express_1.default.json());
        app.get('/', (req, res) => {
            res.send('Hello world!');
        });
        app.use(routes_1.default);
        app.listen(port, () => {
            console.log(`Express server is running on PORT:${port}`);
        });
    });
}
startApp().catch((error) => {
    console.error("Failed to start the server:", error);
});
