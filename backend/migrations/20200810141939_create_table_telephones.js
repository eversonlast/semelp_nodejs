
exports.up = function(knex, Promise) {
    return knex.schema.createTable('telephones', table=>{
        table.increments('id').primary()
        table.string('ddd', 2).notNull()
        table.string('numeroTelefone', 9).notNull()
        table.integer('idUserTelephone').references('id')
                .inTable('users')
                .notNull()
                .onDelete('CASCADE')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('telephones')
};
