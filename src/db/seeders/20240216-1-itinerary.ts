import { QueryInterface } from 'sequelize'
const faker = require('faker')
const booleans = [true, false]

interface IdType {
  id: number
}

interface UserData {
  name: string
  startDate: Date
  endDate: Date
  cost: number
  details: string
  image: string
  formed: boolean
  originId: number
  countryId: number
  agencyId: number
  createdAt: Date
  updatedAt: Date
}

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    try {
      const originsResult = await queryInterface.sequelize.query(
        'SELECT id FROM Origins;',
        { type: Sequelize.QueryTypes.SELECT }
      )
      //! TS 無法辨識 query 資料，故先 query 再另行定義資料 type，並判斷 query 是否為空
      const origins: IdType[] = originsResult[0] ? originsResult[0] : []

      const countriesResult = await queryInterface.sequelize.query(
        'SELECT id FROM Countries;',
        { type: Sequelize.QueryTypes.SELECT }
      )
      const countries: IdType[] = countriesResult[0] ? countriesResult[0] : []

      const agenciesResult = await queryInterface.sequelize.query(
        'SELECT id FROM Agencies;',
        { type: Sequelize.QueryTypes.SELECT }
        )
      const agencies: IdType[] = agenciesResult[0] ? agenciesResult[0] : []
      
      let userData: UserData[] = []
      for (let i = 1; i <= 30; i++) {
        const startDate: Date = faker.date.future(0.1)
        const endDate: Date = new Date(startDate.getTime() + faker.datatype.number({ min: 4, max: 14 }) * 24 * 60 * 60 * 1000)
        const originId: number = origins[Math.floor(Math.random() * origins.length)].id
        const countryId: number = countries[Math.floor(Math.random() * countries.length)].id
        const agencyId: number = agencies[Math.floor(Math.random() * agencies.length)].id
        userData.push({
          name: faker.name.findName(),
          startDate: startDate,
          endDate: endDate,
          cost: faker.datatype.number({ min: 20000, max: 150000 }),
          details: faker.lorem.sentences(3),
          image: `https://loremflickr.com/320/240/landmark,scenery/?lock=${i}`,
          formed: booleans[Math.floor(Math.random() * 2)],
          originId: originId,
          countryId: countryId,
          agencyId: agencyId,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      }
      await queryInterface.bulkInsert('Itineraries', userData)
    } catch (error) {
      console.error('Error occurred:', error)
    }
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete('Itineraries', {}, {})
  }
}