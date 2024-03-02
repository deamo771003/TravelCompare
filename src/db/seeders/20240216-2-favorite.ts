import { QueryInterface } from 'sequelize'
const booleans = [true, false]
let checkFavoriteRepeat: { [key:string]: boolean } = {}

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    try {
    const itineraries = await queryInterface.sequelize.query(
      'SELECT id FROM Itineraries;',
      { type: Sequelize.QueryTypes.SELECT }
      ) as unknown as [{ id: string; }[], any]

    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: Sequelize.QueryTypes.SELECT }
      ) as unknown as [{ id: string; }[], any]

    const generateUniqueFavorite = () => {
      let itineraryId, userId, key
      do {
        itineraryId = itineraries[Math.floor(Math.random() * itineraries.length)].id
        userId = users[Math.floor(Math.random() * users.length)].id
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