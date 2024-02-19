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
exports.loadSecrets = void 0;
require('dotenv').config();
const { getSecret } = require('./getSecretsManager');
const secretName = 'travelCompareENV';
function loadSecrets(key) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const secrets = yield getSecret(secretName);
            const env = {
                AWS_NODE_ENV: secrets.NODE_ENV,
                AWS_DB_HOST: secrets.DB_HOST,
                AWS_DB_USERNAME: secrets.DB_USERNAME,
                AWS_DB_PASSWORD: secrets.DB_PASSWORD,
                AWS_DB_DATABASE: secrets.DB_DATABASE,
                AWS_URL: secrets.URL,
                DB_DATABASE: secrets.LOCAL_DB_DATABASE,
                DB_USERNAME: secrets.LOCAL_DB_USERNAME,
                DB_PASSWORD: secrets.LOCAL_DB_PASSWORD,
                DB_HOST: secrets.LOCAL_DB_HOST
            };
            return env[key];
        }
        catch (error) {
            console.error('Failed to load secrets:', error);
            process.exit(1);
        }
    });
}
exports.loadSecrets = loadSecrets;
