
exports.up = function(knex) {
  return knex.schema.alterTable('modalities', function(table){
        table.dropColumn('needAttestation');
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('modalities', function(table){
        table.boolean('needAttestation');
  })
};
