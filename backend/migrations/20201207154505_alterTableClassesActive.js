
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('classesUsers', function(table){
        table.boolean('activeClass')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('classesUsers', function(table){
        table.dropColumn('activeClass')
    })
};
