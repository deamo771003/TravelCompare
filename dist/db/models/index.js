"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.sequelize = exports.initializeDatabase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("./user");
const favorite_1 = require("./favorite");
const star_1 = require("./star");
const comment_1 = require("./comment");
const itinerary_1 = require("./itinerary");
const origin_1 = require("./origin");
const country_1 = require("./country");
const agency_1 = require("./agency");
const loadSecrets_1 = require("helpers/loadSecrets");
const config_1 = require("config/config");
const env = (process.env.NODE_ENV ? process.env.NODE_ENV : 'development');
let sequelize;
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, loadSecrets_1.loadSecrets)();
        console.log(`env=${env}`);
        const dbConfig = (0, config_1.getDatabaseConfig)(env);
        console.log(`dbConfig=${JSON.stringify(dbConfig, null, 2)}`);
        exports.sequelize = sequelize = new sequelize_typescript_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            dialect: dbConfig.dialect,
            models: [user_1.User, favorite_1.Favorite, star_1.Star, comment_1.Comment, itinerary_1.Itinerary, origin_1.Origin, country_1.Country, agency_1.Agency]
        });
        try {
            yield sequelize.authenticate();
            console.log('Connection has been established successfully.');
            yield sequelize.sync({ force: true }); // 如果表格已存在，可使用 { force: true } 覆蓋
            console.log('Table created successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
exports.initializeDatabase = initializeDatabase;
__exportStar(require("./user"), exports);
__exportStar(require("./favorite"), exports);
__exportStar(require("./comment"), exports);
__exportStar(require("./itinerary"), exports);
__exportStar(require("./origin"), exports);
__exportStar(require("./country"), exports);
__exportStar(require("./agency"), exports);
__exportStar(require("./star"), exports);
