"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const models_1 = require("../db/models");
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
                return cb(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤！'));
            return cb(null, user);
        });
    })
        .catch(err => cb(err, false, req.flash('error_messages', 'Database query error.')));
}));
// 序列化用户到 session
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// 从 session 反序列化用户
passport_1.default.deserializeUser((id, done) => {
    models_1.User.findById(id, (err, user) => {
        done(err, user);
    });
});
