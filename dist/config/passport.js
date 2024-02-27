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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const models_1 = require("../db/models");
const bcrypt = __importStar(require("bcrypt"));
passport_1.default.use(new passport_local_1.Strategy(
// customize user field
{
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, 
// authenticate user
(req, email, password, cb) => {
    models_1.User.findOne({ where: { email } })
        .then(user => {
        if (!user)
            return cb(null, false, { message: '帳號或密碼輸入錯誤！' });
        bcrypt.compare(password, user.password)
            .then(res => {
            if (!res)
                return cb(null, false, { message: '帳號或密碼輸入錯誤！' });
            return cb(null, user);
        });
    })
        .catch(err => cb(err, false, { message: 'Database query error.' }));
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, cb) => {
    return models_1.User.findByPk(id)
        .then(user => {
        if (user === null) {
            cb(null, false);
        }
        else {
            cb(null, user.toJSON());
        }
    })
        .catch(err => cb(err));
});
