
exports.up = function(knex, Promise) {
    return knex.schema.createTable('medicalExams', (table)=>{
        table.increments('id').primary()
        table.date('validadeExam').notNull()
        table.date('examMonth').notNull()
        table.string('pathMedicalExam')
        table.integer('idUser').references('id')
            .inTable('users')
            .notNull()
            .onDelete('CASCADE')

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('medicalExmas')
};
