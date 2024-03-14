// 使用sequelize內的QueryInterface方法來處理database的CRUD
import { QueryInterface } from 'sequelize'

interface Agencies {
  name: string
  createdAt: Date
  updatedAt: Date
}

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    const agencyData: string[] = ['燦星','雄獅','東南','山富','百威','可樂','五福','易遊網']
    const agencies: Agencies[] = agencyData.map(name => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    
    return await queryInterface.bulkInsert('Agencies', agencies)
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return await queryInterface.bulkDelete('Agencies', {}, {})
  }
}