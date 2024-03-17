import { Sequelize } from 'sequelize-typescript'
import { User } from '../db/models/user'
import { Favorite } from '../db/models/favorite'
import { Star } from '../db/models/star'
import { Comment } from '../db/models/comment'
import { Itinerary } from '../db/models/itinerary'
import { Origin } from '../db/models/origin'
import { Country } from '../db/models/country'
import { Agency } from '../db/models/agency'

describe('User model', () => {
  let sequelize: Sequelize

  beforeAll(async () => {
    try {
      sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [User, Favorite, Star, Comment, Itinerary, Origin, Country, Agency],
      logging: false
    })
    await sequelize.sync()
    } catch (error) {
      console.error('Error during Sequelize initialization:', error)
    }
    
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('create user', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'testpassword',
      admin: false
    }

    const user = await User.create(userData)

    expect(user.email).toEqual(userData.email)
    expect(user.name).toEqual(userData.name)
    expect(user.password).toEqual(userData.password)
    expect(user.admin).toEqual(userData.admin)
  })
})