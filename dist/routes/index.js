"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const users_1 = __importDefault(require("./modules/users"));
const itinerary_1 = __importDefault(require("./modules/itinerary"));
const passport_1 = __importDefault(require("passport"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
/**
 * @swagger
 * /users/signin:
 *   post:
 *     summary: Sign in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully sign in
 *       400:
 *         description: Bad request
 */
router.post('/users/signin', (req, res, next) => {
    if (!req.body.email || !req.body.password)
        return res.status(400).json({ status: 'error', message: "Account and Password is required" });
    next();
}, passport_1.default.authenticate('local', { session: false }), user_controller_1.default.signIn);
router.use('/users', users_1.default);
router.use('/itinerary', itinerary_1.default);
exports.default = router;
