const { Sequelize, QueryTypes } = require('sequelize');

// 假設你已經有一個sequelize實例
const sequelize = new Sequelize('travel_compare', 'sa', 'password', {
  host: 'localhost',
  dialect: 'mssql'
});

async function countOrigins() {
  try {
    const origins = await sequelize.query(
      'SELECT id FROM Origins;',
      { type: Sequelize.QueryTypes.SELECT }
    );
    console.log(`origins=${origins}`)

    const countries = await sequelize.query(
      'SELECT id FROM Countries;',
      { type: Sequelize.QueryTypes.SELECT }
    )
    console.log(`countries=${countries}`)

    const agencies = await sequelize.query(
      'SELECT id FROM Agencies;',
      { type: Sequelize.QueryTypes.SELECT }
    )
    console.log(`agencies=${agencies}`)

    const originId = origins[Math.floor(Math.random() * origins.length)].id
    console.log(`originId=${originId}`)
    const countryId = countries[Math.floor(Math.random() * countries.length)].id
    console.log(`countryId=${countryId}`)
    const agencyId = agencies[Math.floor(Math.random() * agencies.length)].id
    console.log(`agencyId=${agencyId}`)

  } catch (error) {
    console.error('Error:', error);
  }
}

countOrigins();
