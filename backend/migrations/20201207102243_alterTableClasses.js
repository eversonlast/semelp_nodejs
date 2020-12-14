
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('classes', function(table){
        table.dropColumn('idProfessorResponsability')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable("classes", function(table){
        table.integer('idProfessorResponsability').references('id').inTable('users').onDelete('cascade')
    })
};
