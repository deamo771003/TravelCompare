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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../db/models");
const jwt = __importStar(require("jsonwebtoken"));
const userServices = {
    signup: ({ username, password }, cb) => {
        models_1.User.create({
            username,
            password
        })
            .then(user => {
            const userData = user.toJSON();
            delete userData.password;
            cb(null, {
                status: 'success',
                user: userData
            });
        })
            .catch(err => cb(err));
    },
    signIn: (req, cb) => {
        try {
            if (!process.env.JWT_SECRET)
                throw new Error('Undefined JWT_SECRET!');
            const _a = req.body, { password } = _a, userData = __rest(_a, ["password"]);
            const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1d' });
            cb(null, {
                status: 'success',
                data: {
                    token,
                    userData
                }
            });
        }
        catch (err) {
            cb(err);
        }
    }
};
exports.default = userServices;
