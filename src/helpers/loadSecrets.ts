require('dotenv').config()
const { getSecret } = require('./getSecretsManager')
const secretName = 'travelCompareENV'

export async function loadSecrets() {
  try {
    const secrets = await getSecret(secretName)
    process.env.AWS_NODE_ENV = secrets.NODE_ENV
    process.env.AWS_DB_HOST = secrets.DB_HOST
    process.env.AWS_DB_USERNAME = secrets.DB_USERNAME
    process.env.AWS_DB_PASSWORD = secrets.DB_PASSWORD
    process.env.AWS_DB_DATABASE = secrets.DB_DATABASE
    process.env.AWS_URL = secrets.URL
    process.env.DB_DATABASE = secrets.LOCAL_DB_DATABASE
    process.env.DB_USERNAME = secrets.LOCAL_DB_USERNAME
    process.env.DB_PASSWORD = secrets.LOCAL_DB_PASSWORD
    process.env.DB_HOST = secrets.LOCAL_DB_HOST

  } catch (error) {
    console.error('Failed to load secrets:', error)
    process.exit(1)
  }
}
