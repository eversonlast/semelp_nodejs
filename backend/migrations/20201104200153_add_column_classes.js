
exports.up = function(knex, Promise) {  
    return knex.schema.alterTable('classes', function(table){
        table.string('faixaEtaria')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('classes', function(table){
        table.dropColumn('faixaExtaria')
    })
};
