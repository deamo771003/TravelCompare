import express from 'express'
const router = express.Router()
import users from './modules/users'

router.use('/users', users)

export default router