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
const faker = require('faker');
const booleans = [true, false];
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const originsResult = yield queryInterface.sequelize.query('SELECT id FROM Origins;', { type: Sequelize.QueryTypes.SELECT });
            //! TS 無法辨識 query 資料，故先 query 再另行定義資料 type，並判斷 query 是否為空
            const origins = originsResult[0] ? originsResult[0] : [];
            const countriesResult = yield queryInterface.sequelize.query('SELECT id FROM Countries;', { type: Sequelize.QueryTypes.SELECT });
            const countries = countriesResult[0] ? countriesResult[0] : [];
            const agenciesResult = yield queryInterface.sequelize.query('SELECT id FROM Agencies;', { type: Sequelize.QueryTypes.SELECT });
            const agencies = agenciesResult[0] ? agenciesResult[0] : [];
            let userData = [];
            for (let i = 1; i <= 30; i++) {
                const startDate = faker.date.future(0.1);
                const endDate = new Date(startDate.getTime() + faker.datatype.number({ min: 4, max: 14 }) * 24 * 60 * 60 * 1000);
                const originId = origins[Math.floor(Math.random() * origins.length)].id;
                const countryId = countries[Math.floor(Math.random() * countries.length)].id;
                const agencyId = agencies[Math.floor(Math.random() * agencies.length)].id;
                userData.push({
                    name: faker.name.findName(),
                    startDate: startDate,
                    endDate: endDate,
                    cost: faker.datatype.number({ min: 20000, max: 150000 }),
                    details: faker.lorem.sentences(3),
                    image: `https://loremflickr.com/320/240/landmark,scenery/?lock=${i}`,
                    formed: booleans[Math.floor(Math.random() * 2)],
                    originId: originId,
                    countryId: countryId,
                    agencyId: agencyId,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }
            yield queryInterface.bulkInsert('Itineraries', userData);
        }
        catch (error) {
            console.error('Error occurred:', error);
        }
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('Itineraries', {}, {});
    })
};
