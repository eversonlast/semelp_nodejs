
exports.up = function(knex) {
  return knex.schema.alterTable('classes', function(table){
        table.dropColumn('faixaEtaria');
        table.integer('idadeMinima');
        table.integer('idadeMaxima');
        table.integer('needAttestationAll');
        table.integer('needAttestationBetterAge');
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('classes', function(table){
        table.string('faixaEtaria');
        table.dropColumn('idadeMinima');
        table.dropColumn('idadeMaxima');
        table.integer('needAttestationAll');
        table.integer('needAttestationBetterAge');
  })
};
