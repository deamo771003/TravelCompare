import express from 'express'
const router = express.Router()
import users from './modules/users'
import itinerary from './modules/itinerary'
import passport from 'passport'
import userController from '../controllers/user-controller'

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
  if (!req.body.email || !req.body.password) return res.status(400).json({ status: 'error', message: "Email and Password is required" })
  next()
},
  passport.authenticate('local', { session: false }), userController.signIn
)
router.use('/users', users)
router.use('/itinerary', itinerary)

export default router