import express from 'express'
const router = express.Router()
import users from './modules/users'
import itinerary from './modules/itinerary'

router.use('/users', users)
router.use('/itinerary', itinerary)

export default router