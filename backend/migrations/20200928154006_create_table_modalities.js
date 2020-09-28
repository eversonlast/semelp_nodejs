
exports.up = function(knex, Promise) {
    return knex.schema.createTable('modalities', table=>{
        table.increments('id').primary()
        table.string('nomeModalidade').notNull()
        table.string('setor').notNull()
        table.string('departamento')
        table.integer('idResponsabilityModality').references('id').inTable('users')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('modalities')
};
