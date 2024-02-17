// 使用sequelize內的QueryInterface方法來處理database的CRUD
import { QueryInterface } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    const originData = ['松山機場','桃園機場','台中機場','高雄機場']
    const origins = originData.map(name => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    
    return queryInterface.bulkInsert('Origins', origins)
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete('Origins', {}, {})
  }
}