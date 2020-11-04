
exports.up = function(knex, Promise) {
    return knex.schema.createTable('classes', table=>{
        table.increments('id').primary()
        table.string('dias').notNull()
        table.string('horarios').notNull()
        table.integer('idProfessorResponsability').references('id').inTable('users')
        table.integer('idSportCenter').references('id').inTable('sportsCenters').onDelete('cascade')
        table.integer('idModality').references('id').inTable('modalities').onDelete('cascade')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('classes')
};
