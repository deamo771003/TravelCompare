// 使用sequelize內的QueryInterface方法來處理database的CRUD
import { QueryInterface } from 'sequelize'

interface Countries {
  name: string
  createdAt: Date
  updatedAt: Date
}

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    const countryData: string[] = ['日本','美國','越南','土耳其','西班牙','杜拜','法國', '意大利', '泰國', '墨西哥', '英國', '德國', '澳大利亞', '加拿大', '印度']
    const countries: Countries[] = countryData.map(name => ({
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    
    return queryInterface.bulkInsert('Countries', countries)
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete('Countries', {}, {})
  }
}