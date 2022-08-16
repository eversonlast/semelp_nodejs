
exports.up = function(knex) {
    return knex.schema.createTable('tb_control_age', table=>{
        table.increments('id').primary();
        table.integer('age');
        table.integer('ativo');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_control_age');
};
