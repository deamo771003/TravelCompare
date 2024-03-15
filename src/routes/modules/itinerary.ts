import express from 'express'
const router = express.Router()
import itineraryController from '../../controllers/itinerary-controller'

/**
 * @swagger
 * /itinerary/getIndexData:
 *   get:
 *     summary: get index data
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request due to missing or invalid parameters
 */
router.get('/getIndexData',itineraryController.getIndexData)

export default router