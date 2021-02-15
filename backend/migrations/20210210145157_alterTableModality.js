
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('modalities', (table)=>{
        table.boolean('needAttestation')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTabe('modalities', (table)=>{
        table.dropColumn('needAttestation')
    })
};
