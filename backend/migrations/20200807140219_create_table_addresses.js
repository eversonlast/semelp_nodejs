
exports.up = function(knex, Promise) {
    return knex.schema.createTable('addresses', table =>{
        table.increments('id').primary()
        table.string('tipoLogradouro').notNull()
        table.string('nomeLogradouro').notNull()
        table.string('numeroCasa').notNull()
        table.string('bairro').notNull()
        table.string('cidade').notNull()
        table.string('estadoEndereco', 2)
        table.string('cep', 9).notNull()
        table.integer('idUserAddress').references('id').inTable('users').notNull().onDelete('CASCADE')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('addresses')
};
