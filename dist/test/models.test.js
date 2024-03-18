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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../db/models/user");
const favorite_1 = require("../db/models/favorite");
const star_1 = require("../db/models/star");
const comment_1 = require("../db/models/comment");
const itinerary_1 = require("../db/models/itinerary");
const origin_1 = require("../db/models/origin");
const country_1 = require("../db/models/country");
const agency_1 = require("../db/models/agency");
describe('User model', () => {
    let sequelize;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            sequelize = new sequelize_typescript_1.Sequelize({
                dialect: 'sqlite',
                storage: ':memory:',
                models: [user_1.User, favorite_1.Favorite, star_1.Star, comment_1.Comment, itinerary_1.Itinerary, origin_1.Origin, country_1.Country, agency_1.Agency],
                logging: false
            });
            yield sequelize.sync();
        }
        catch (error) {
            console.error('Error during Sequelize initialization:', error);
        }
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.close();
    }));
    test('create user', () => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            email: 'test@example.com',
            name: 'Test User',
            password: 'testpassword',
            admin: false
        };
        const user = yield user_1.User.create(userData);
        expect(user.email).toEqual(userData.email);
        expect(user.name).toEqual(userData.name);
        expect(user.password).toEqual(userData.password);
        expect(user.admin).toEqual(userData.admin);
        console.log('all test ok');
    }));
});
