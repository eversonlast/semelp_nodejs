
exports.up = function(knex) {
    return knex.schema.alterTable('medicalExams', (table)=>{
        table.boolean('activeExam')
    })
};

exports.down = function(knex) {
    return knex.schema.alterTable('medicalExams', (table)=>{
        table.dropColumn('activeExam')
    })
};
