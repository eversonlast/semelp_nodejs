// Update with your config settings.

module.exports = {

    client: 'postgresql',
    connection: {
      database: 'semelp_nodejs',
      user:     'postgres',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
 

};
