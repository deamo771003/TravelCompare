"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../db/models");
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
    }
};
exports.default = userServices;
