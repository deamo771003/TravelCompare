"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user-service"));
const userController = {
    signup: (req, res, next) => {
        const { username, password } = req.body;
        const signUpInfo = { username, password };
        user_service_1.default.signup(signUpInfo, (err, data) => {
            if (err) {
                next(err);
            }
            else {
                res.status(200).json(data);
            }
        });
    },
    signIn: (req, res, next) => {
        user_service_1.default.signIn(req, (err, data) => err ? next(err) : res.status(200).json(data));
    }
};
exports.default = userController;
