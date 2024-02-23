import dotenv from 'dotenv'
dotenv.config();
import { Sequelize } from 'sequelize-typescript'
import { User } from './user'
import { Favorite } from './favorite'
import { Star } from './star'
import { Comment } from './comment'
import { Itinerary } from './itinerary'
import { Origin } from './origin'
import { Country } from './country'
import { Agency } from './agency'
import { loadSecrets } from '../../helpers/loadSecrets'
import { getDatabaseConfig } from '../../config/config'

let sequelize: Sequelize;
// 導入seeders
const originSeed = require('../seeders/20240210-origin-seed')
const agencySeed = require('../seeders/20240215-agency-seed')
const countrySeed = require('../seeders/20240215-country-seed')
const userSeed = require('../seeders/20240215-user-seed')
const itinerarySeed = require('../seeders/20240216-1-itinerary')
const favoriteSeed = require('../seeders/20240216-2-favorite')

// ORM 初始化時自動化判斷 run seeders
async function runSeeders() {
  const usersCount = await User.count();
  if (usersCount > 0) {
    console.log('Database already has data. Skipping seeders.')
    return
  }
  try {
  // run seeders
  await originSeed.up(sequelize.getQueryInterface(), Sequelize)
  await agencySeed.up(sequelize.getQueryInterface(), Sequelize)
  await countrySeed.up(sequelize.getQueryInterface(), Sequelize)
  await userSeed.up(sequelize.getQueryInterface(), Sequelize)
  await itinerarySeed.up(sequelize.getQueryInterface(), Sequelize)
  await favoriteSeed.up(sequelize.getQueryInterface(), Sequelize)
  console.log('Seeders have been executed successfully.')
  } catch (error) {
    console.error('Running seeders failed:', error)
  }
}

// ORM 初始化 DB
export async function initializeDatabase() {
  if (process.env.NODE_ENV === 'production') {
    await loadSecrets()
  }
  const env = process.env.NODE_ENV as keyof typeof getDatabaseConfig | 'development';
  const dbConfig = getDatabaseConfig(env)
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    models: [User, Favorite, Star, Comment, Itinerary, Origin, Country, Agency],
  })
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync() // 欲重跑 model 加入 { force: true }
    console.log('Table created successfully.')
    await runSeeders()
    console.log('runSeeders successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { sequelize }
// 導出 models
export * from './user'
export * from './favorite'
export * from './comment'
export * from './itinerary'
export * from './origin'
export * from './country'
export * from './agency'
export * from './star'
