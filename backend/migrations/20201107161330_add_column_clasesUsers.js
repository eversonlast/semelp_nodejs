
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('classesUsers', function(table){
        table.string('quantidadesDeFalta')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('classesUsers', function(table){
        table.dropColumn('quantidadesDeFalta')
    })
};
