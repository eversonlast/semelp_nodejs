
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table=>{
        table.increments('id').primary()
        table.string('nome').notNull()
        table.string('mae').notNull()
        table.string('pai').notNull()
        table.string('tipoDocumento').notNull()
        table.string('documento').notNull()
        table.string('cpf', 11).notNull().unique()
        table.string('email').notNull()
        table.string('password', 300).notNull()
        table.string('naturalidade')
        table.string('estado', 2)
        table.string('escolaTrabalho')
        table.date('dataNasc'),
        table.timestamp('dataInscricao').defaultTo(knex.fn.now()),
        table.string('tipoUsuario').notNull().defaultTo('user')

    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
