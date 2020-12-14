
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('classes', function(table){
        table.integer('maxLackMounth')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('classes', function(table){
        table.dropColumn('maxLackMounth')
    })
};
