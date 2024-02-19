import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize-typescript'
import { User } from './user'
import { Favorite } from './favorite';
import { Star } from './star';
import { Comment } from './comment';
import { Itinerary } from './itinerary';
import { Origin } from './origin'
import { Country } from './country'
import { Agency } from './agency'
// import { config } from '../../config/config'
import { ConfigInterface } from '../../interfaces/config-interface'
import { loadSecrets } from '../../helpers/loadSecrets'
import { getDatabaseConfig } from '../../config/config'

let sequelize: Sequelize

export async function initializeDatabase() {
  await loadSecrets()
  const env = (process.env.NODE_ENV ? process.env.NODE_ENV : 'development') as keyof ConfigInterface
  console.log(`env=${env}`)
  const dbConfig = getDatabaseConfig(env)
  console.log(`dbConfig=${JSON.stringify(dbConfig, null, 2)}`);
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      models: [User, Favorite, Star, Comment, Itinerary, Origin, Country, Agency]
    }
  )

  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
    await sequelize.sync({ force: true }); // 如果表格已存在，可使用 { force: true } 覆蓋
    console.log('Table created successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

export { sequelize }

export * from './user'
export * from './favorite'
export * from './comment'
export * from './itinerary'
export * from './origin'
export * from './country'
export * from './agency'
export * from './star'