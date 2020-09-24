exports.up = function(knex, Promise) {
    return knex.schema.alterTable('addresses', function(table){
        table.dropColumn('tipoLogradouro')
    })
};

exports.down = function(knex, Promise) {    
    return knex.schema.alterTable('addresses', function(table){
        table.string('tipoLogradouro')
    })
};  
