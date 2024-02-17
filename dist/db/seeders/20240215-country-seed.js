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
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const countryData = ['日本', '美國', '越南', '土耳其', '西班牙', '杜拜', '法國', '意大利', '泰國', '墨西哥', '英國', '德國', '澳大利亞', '加拿大', '印度'];
        const countries = countryData.map(name => ({
            name,
            createdAt: new Date(),
            updatedAt: new Date()
        }));
        return queryInterface.bulkInsert('Countries', countries);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('Countries', {}, {});
    })
};
