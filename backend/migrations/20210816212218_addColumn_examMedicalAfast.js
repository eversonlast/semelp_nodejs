
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('examMedicalAfast', table=>{
	  table.string('quantidadesDeDias')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable("examMedicalAfast", table=>{
	  table.dropColumn('quantidadesDeDias')
  })
};
