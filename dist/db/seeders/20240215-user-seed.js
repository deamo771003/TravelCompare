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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require('faker');
const bcrypt = __importStar(require("bcrypt"));
const generatePassword = () => __awaiter(void 0, void 0, void 0, function* () {
    let password = "";
    const length = 9;
    for (let i = 0; i < length; i++) {
        password += Math.floor(Math.random() * 10);
    }
    const hashPassword = yield bcrypt.hash(password, 10);
    return hashPassword;
});
const fakeUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return ({
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: yield generatePassword(),
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
    });
});
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const fakeUsers = yield Promise.all(Array.from({ length: 50 }, () => __awaiter(void 0, void 0, void 0, function* () { return yield fakeUser(); })));
        const testUser = {
            email: 'root@example.com',
            name: 'root',
            password: yield bcrypt.hash('123456', 10),
            admin: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        fakeUsers.push(testUser);
        return queryInterface.bulkInsert('Users', fakeUsers);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        return queryInterface.bulkDelete('Users', {}, {});
    })
};
