
exports.up = function(knex) {
  return knex.schema.alterTable('users', (table)=>{
      table.string('pathPhoto')
  })
};

exports.down = function(knex) {
  return knex.schema.alterTable('users', (table)=>{
      table.dropColumn('pathPhoto')
  })
};
