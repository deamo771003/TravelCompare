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
const config = require('../../config/config');
let sequelize;
// 導入seeders
const originSeed = require('../seeders/20240210-origin-seed');
const agencySeed = require('../seeders/20240215-agency-seed');
const countrySeed = require('../seeders/20240215-country-seed');
const userSeed = require('../seeders/20240215-user-seed');
const itinerarySeed = require('../seeders/20240216-1-itinerary');
const favoriteSeed = require('../seeders/20240216-2-favorite');
// ORM 初始化時自動化判斷 run seeders
function runSeeders() {
    return __awaiter(this, void 0, void 0, function* () {
        const usersCount = yield user_1.User.count();
        if (usersCount > 0) {
            console.log('Database already has data. Skipping seeders.');
            return;
        }
        try {
            // run seeders
            yield originSeed.up(sequelize.getQueryInterface(), sequelize_typescript_1.Sequelize);
            yield agencySeed.up(sequelize.getQueryInterface(), sequelize_typescript_1.Sequelize);
            yield countrySeed.up(sequelize.getQueryInterface(), sequelize_typescript_1.Sequelize);
            yield userSeed.up(sequelize.getQueryInterface(), sequelize_typescript_1.Sequelize);
            yield itinerarySeed.up(sequelize.getQueryInterface(), sequelize_typescript_1.Sequelize);
            yield favoriteSeed.up(sequelize.getQueryInterface(), sequelize_typescript_1.Sequelize);
            console.log('Seeders have been executed successfully.');
        }
        catch (error) {
            console.error('Running seeders failed:', error);
        }
    });
}
// ORM 初始化 DB
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const env = process.env.NODE_ENV || 'development';
        const dbConfig = config[env];
        exports.sequelize = sequelize = new sequelize_typescript_1.Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            host: dbConfig.host,
            dialect: dbConfig.dialect,
            models: [user_1.User, favorite_1.Favorite, star_1.Star, comment_1.Comment, itinerary_1.Itinerary, origin_1.Origin, country_1.Country, agency_1.Agency],
            logging: false
        });
        try {
            yield sequelize.authenticate();
            console.log('Connection has been established successfully.');
            yield sequelize.sync(); // 欲重跑 model 加入 { force: true }
            console.log('Table created successfully.');
            yield runSeeders();
            console.log('runSeeders successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
exports.initializeDatabase = initializeDatabase;
// 導出 models
__exportStar(require("./user"), exports);
__exportStar(require("./favorite"), exports);
__exportStar(require("./comment"), exports);
__exportStar(require("./itinerary"), exports);
__exportStar(require("./origin"), exports);
__exportStar(require("./country"), exports);
__exportStar(require("./agency"), exports);
__exportStar(require("./star"), exports);
