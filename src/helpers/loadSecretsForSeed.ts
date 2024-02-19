require('dotenv').config()
const { getSecret } = require('./getSecretsManager')
const secretName = 'travelCompareENV'

interface Env {
  [key: string]: any;
}

export async function loadSecrets(key: string) {
  try {
    const secrets = await getSecret(secretName)
    const env: Env = {
      AWS_NODE_ENV: secrets.NODE_ENV,
      AWS_DB_HOST: secrets.DB_HOST,
      AWS_DB_USERNAME: secrets.DB_USERNAME,
      AWS_DB_PASSWORD: secrets.DB_PASSWORD,
      AWS_DB_DATABASE: secrets.DB_DATABASE,
      AWS_URL: secrets.URL,
      DB_DATABASE: secrets.LOCAL_DB_DATABASE,
      DB_USERNAME: secrets.LOCAL_DB_USERNAME,
      DB_PASSWORD: secrets.LOCAL_DB_PASSWORD,
      DB_HOST: secrets.LOCAL_DB_HOST
    }
    return env[key]

  } catch (error) {
    console.error('Failed to load secrets:', error)
    process.exit(1)
  }
}