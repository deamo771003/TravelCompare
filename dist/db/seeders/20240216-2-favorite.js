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
const booleans = [true, false];
let checkFavoriteRepeat = {};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const itineraries = yield queryInterface.sequelize.query('SELECT id FROM Itineraries;', { type: Sequelize.QueryTypes.SELECT });
            const users = yield queryInterface.sequelize.query('SELECT id FROM Users;', { type: Sequelize.QueryTypes.SELECT });
            const generateUniqueFavorite = () => {
                let itineraryId, userId, key;
                do {
                    itineraryId = itineraries[Math.floor(Math.random() * itineraries.length)].id, 10;
                    userId = users[Math.floor(Math.random() * users.length)].id, 10;
                    key = `${itineraryId}-${userId}`;
                } while (checkFavoriteRepeat[key]);
                checkFavoriteRepeat[key] = true;
                return {
                    visited: booleans[Math.floor(Math.random() * 2)],
                    userId: userId,
                    itineraryId: itineraryId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
            };
            const favorites = Array.from({ length: 10 }, () => generateUniqueFavorite());
            return queryInterface.bulkInsert('Favorites', favorites);
        }
        catch (error) {
            console.error('Error occurred:', error);
        }
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('Favorites', {}, {});
    })
};
