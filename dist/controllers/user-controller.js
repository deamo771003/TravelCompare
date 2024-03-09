"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user-service"));
const baseController_1 = require("./baseController");
class userController extends baseController_1.BaseController {
    constructor() {
        super(...arguments);
        this.signup = (req, res, next) => {
            const { username, password } = req.body;
            const signUpInfo = { username, password };
            user_service_1.default.signup(signUpInfo, (err, data) => {
                err ? next(err) : this.sendResponses(res, data);
            });
        };
        this.signIn = (req, res, next) => {
            user_service_1.default.signIn(req, (err, data) => {
                err ? next(err) : this.sendResponses(res, data);
            });
        };
    }
}
exports.default = new userController();
