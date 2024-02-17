import { QueryInterface } from 'sequelize'
const faker = require('faker')
const booleans = [true, false]

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    try {
    const origins = await queryInterface.sequelize.query(
      'SELECT id FROM Origins;',
      { type: Sequelize.QueryTypes.SELECT }
      ) as unknown as [{ id: string; }[], any]

    const countries = await queryInterface.sequelize.query(
      'SELECT id FROM Countries;',
      { type: Sequelize.QueryTypes.SELECT }
      ) as unknown as [{ id: string; }[], any]

    const agencies = await queryInterface.sequelize.query(
      'SELECT id FROM Agencies;',
      { type: Sequelize.QueryTypes.SELECT }
      ) as unknown as [{ id: string; }[], any]

    const itineraryData = () => {
      const startDate = faker.date.future(0.1)
      const endDate = new Date(startDate.getTime() + faker.datatype.number({ min: 4, max: 14 }) * 24 * 60 * 60 * 1000)
      const originId = origins[Math.floor(Math.random() * origins.length)].id
      const countryId = countries[Math.floor(Math.random() * countries.length)].id
      const agencyId = agencies[Math.floor(Math.random() * agencies.length)].id

    return {
      name: faker.name.findName(),
      startDate: startDate,
      endDate: endDate,
      cost: faker.datatype.number({ min: 20000, max: 150000 }),
      details: faker.lorem.sentences(3),
      image: `https://loremflickr.com/320/240/landmark,scenery/?lock=${Math.floor(Math.random() * 30)}`,
      formed: booleans[Math.floor(Math.random() * 2)],
      originId: originId,
      countryId: countryId,
      agencyId: agencyId,
      createdAt: new Date(),
      updatedAt: new Date()
    }
      }

    const itineraries = Array.from({ length: 30 }, () => itineraryData())
    return queryInterface.bulkInsert('Itineraries', itineraries)
      
    } catch (error) {
      console.error('Error occurred:', error)
    }
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete('Itineraries', {}, {})
  }
}