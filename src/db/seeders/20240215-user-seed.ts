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

const fakeUser = async () => ({
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: await generatePassword(),
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
const fakeUsers = await Promise.all(
      Array.from({ length: 50 }, async () => await fakeUser())
    )
    const testUser = async () => ({
      email: 'root@example.com',
      name: 'root',
      password: await bcrypt.hash('123456', 10),
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const testUserResult = await testUser()
    fakeUsers.push(testUserResult)

    return queryInterface.bulkInsert('Users', fakeUsers)
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete('Users', {}, {})
  }
}