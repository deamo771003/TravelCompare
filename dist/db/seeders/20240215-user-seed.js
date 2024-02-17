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
const generatePassword = () => {
    let password = "";
    const length = 9;
    for (let i = 0; i < length; i++) {
        password += Math.floor(Math.random() * 10);
    }
    return password;
};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const fakeUser = () => ({
            email: faker.internet.email(),
            name: faker.name.findName(),
            password: generatePassword(),
            admin: false,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const users = Array.from({ length: 10 }, () => fakeUser());
        return queryInterface.bulkInsert('Users', users);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('Users', {}, {});
    })
};
