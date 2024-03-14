import { QueryInterface } from 'sequelize'
const faker = require('faker')
import * as bcrypt from 'bcrypt' 

interface FakeUser {
  email: string
  name: string
  password: string
  admin: boolean
  createdAt: Date
  updatedAt: Date
}

const generatePassword = async () => {
  let password = ""
  const length: number = 9
  for (let i = 0; i < length; i++) {
    password += Math.floor(Math.random() * 10)
  }
  const hashPassword: string = await bcrypt.hash(password, 10)
  return hashPassword
}

const fakeUser = async (): Promise<FakeUser> => ({
      email: faker.internet.email(),
      name: faker.name.findName(),
      password: await generatePassword(),
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) => {
    const fakeUsers: FakeUser[] = await Promise.all(
      Array.from({ length: 50 }, async () => await fakeUser())
    )
    const testUser: FakeUser = {
      email: 'root@example.com',
      name: 'root',
      password: await bcrypt.hash('123456', 10),
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    fakeUsers.push(testUser)

    return queryInterface.bulkInsert('Users', fakeUsers)
  },
  down: async (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.bulkDelete('Users', {}, {})
  }
}