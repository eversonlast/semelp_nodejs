exports.up = function(knex, Promise) {
    return knex.schema.createTable('sportsCenters', table=>{
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('nomeLogradouro').notNull()
        table.string('numero').notNull()
        table.string('bairro').notNull()
        table.string('cep').notNull()
        table.string('telefone').notNull()
        table.string('telefone1')
        table.string('telefone2')
        
    })
};

exports.down = function(knex, Promise) {
  
};
