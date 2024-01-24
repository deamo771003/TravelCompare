// 使用sequelize內的QueryInterface方法來處理database的CRUD
import { QueryInterface } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Jimmy',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete('Users', {}, {})
  }
}