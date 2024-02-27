import { QueryInterface } from 'sequelize'
const faker = require('faker')
import * as bcrypt from 'bcrypt' 

const generatePassword = async () => {
  let password = ""
  const length = 9
  for (let i = 0; i < length; i++) {
    password += Math.floor(Math.random() * 10)
  }
  const hashPassword = await bcrypt.hash(password, 10)
  return hashPassword
}

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    const fakeUser = async () => ({
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: await generatePassword(),
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const users = await Promise.all(Array.from({ length: 10 }, async () => await fakeUser()))
    
    return queryInterface.bulkInsert('Users', users)
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete('Users', {}, {})
  }
}