import express from 'express'
const router = express.Router()
import userController from '../../controllers/user-controller'

// /**
//  * @swagger
//  * /users/signup:
//  *   post:
//  *     summary: Sign up a new user
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - username
//  *               - password
//  *             properties:
//  *               username:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: User successfully signed up
//  *       400:
//  *         description: Bad request
//  */
router.post('/signup', userController.signup)



export default router