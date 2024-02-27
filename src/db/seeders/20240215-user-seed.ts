import { QueryInterface } from 'sequelize'
const faker = require('faker')
import * as bcrypt from 'bcrypt' 

const generatePassword = () => {
  let password = "";
  const length = 9;
  for (let i = 0; i < length; i++) {
    password += Math.floor(Math.random() * 10)
  }
  return password;
}

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    const hashPassword = await bcrypt.hash(generatePassword(), 10)
    const fakeUser = () => ({
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: hashPassword,
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const users = Array.from({ length: 10 }, () => fakeUser())
    
    return queryInterface.bulkInsert('Users', users)
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete('Users', {}, {})
  }
}