
exports.up = function(knex, Promise) {
    return knex.schema.createTable('modalitiesSportsCenters', table=>{
        table.integer('idModality').references('id').inTable('modalities').onDelete('cascade').notNull()
        table.integer('idSportCenter').references('id').inTable('sportsCenters').onDelete('cascade').notNull()
    })
};

exports.down = function(knex, Promise) {    
    return knex.schema.dropTable('modalitiesSportsCentes')
};
