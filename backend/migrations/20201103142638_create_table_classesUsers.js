
exports.up = function(knex, Promise) {
    return knex.schema.createTable('classesUsers', table=>{
        table.increments('id').primary()
        table.integer('idUser').references('id').inTable('users').onDelete('cascade')
        table.integer('idClass').references('id').inTable('classes').onDelete('cascade')
        table.unique('idUser', 'idClass')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('classesUsers')
};
