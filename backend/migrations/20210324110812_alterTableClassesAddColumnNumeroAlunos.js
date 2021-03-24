
exports.up = function(knex) {
  return knex.schema.alterTable('classes', table=>{
      table.string('studentsNumber')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('classes', table=>{
      table.dropColumn('studentsNumber')
  })
};
