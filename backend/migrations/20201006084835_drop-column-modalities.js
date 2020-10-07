
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('modalities', function(table){
        table.dropColumn('setor')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('modalities', function(table){
        table.string('setor')
    })
};
