
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('classesUsers', (table)=>{
        table.dropUnique('idUser', 'idClass')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('classesUsers', (table)=>{
        table.unique('idUser', 'idClass')
    })
};
