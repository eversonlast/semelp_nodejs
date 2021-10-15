// Update with your config settings.
//const { db } = require('./.env')

module.exports = {

    client: 'postgresql',
    connection: {
      database: 'semelp_nodejs',
      user: 'everson',
      password: '4021',
      host: '127.0.0.1'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
 

};
