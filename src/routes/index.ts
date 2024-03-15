import express from 'express'
const router = express.Router()
import users from './modules/users'
import itinerary from './modules/itinerary'
import passport from 'passport'
import userController from '../controllers/user-controller'
import { apiErrorHandler } from '../middlewares/error-handler'

/**
 * @swagger
 * /users/signin:
 *   post:
 *     tags:
 *       - Users
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
 *         description: Email or Password does not exist!
 *       401:
 *         description: Incorrect account or password!
 *       500:
 *         description: Internal server error
 */
router.post('/users/signin', (req, res, next) => {
  if (!req.body.email || !req.body.password) return res.status(400).json({ status: 'error', message: "Email and Password is required" })
  next()
},
  passport.authenticate('local', { session: false }), userController.signIn
)
router.use('/users', users)
router.use('/itinerary', itinerary)
router.use('/', apiErrorHandler)

export default router