import { QueryInterface } from 'sequelize'
import { IdType } from '../../interfaces/dbTable-interface'

interface GenerateUniqueFavorite {
  visited: boolean
  userId: number
  itineraryId: number
  createdAt: Date
  updatedAt: Date
}

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    try {
    const itinerariesResult = await queryInterface.sequelize.query(
      'SELECT id FROM Itineraries;',
      { type: Sequelize.QueryTypes.SELECT }
      )
      const itineraries: IdType[] = itinerariesResult[0] ? itinerariesResult[0] : []

    const usersResult = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: Sequelize.QueryTypes.SELECT }
      )
      const users: IdType[] = usersResult[0] ? usersResult[0] : []

    let checkFavoriteRepeat: { [key: string]: boolean } = {}
    const booleans: boolean[] = [true, false]
    const generateUniqueFavorite = (): GenerateUniqueFavorite => {
      let itineraryId: number, userId: number, key: string
      do {
        const itinerariesRandom: IdType = itineraries[Math.floor(Math.random() * itineraries.length)]
        itineraryId = itinerariesRandom.id
        const userIdRandom: IdType = users[Math.floor(Math.random() * users.length)]
        userId = userIdRandom.id
        key = `${itineraryId}-${userId}`
      } while (checkFavoriteRepeat[key])
      checkFavoriteRepeat[key] = true

      return {
        visited: booleans[Math.floor(Math.random() * 2)],
        userId: userId,
        itineraryId: itineraryId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }

    const favorites = Array.from({ length: 750 }, () => generateUniqueFavorite())
    return queryInterface.bulkInsert('Favorites', favorites)
        
    } catch (error) {
      console.error('Error occurred:', error)
    }
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete('Favorites', {}, {})
  }
}