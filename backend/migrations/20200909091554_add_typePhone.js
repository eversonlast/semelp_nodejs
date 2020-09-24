
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('telephones', function(table){
        table.string('typePhone')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('telephones', function(table){
        table.dropColumn('typePhone')
    })
};
