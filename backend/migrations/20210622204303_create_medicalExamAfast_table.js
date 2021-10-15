
exports.up = function(knex, Promise) {
	return knex.schema.createTable('examMedicalAfast', table=>{
		table.increments('id').primary()
		table.date('dayAtest').notNull()
		table.date('dayVencimento').notNull()
		table.string('pathMedicalExamAfast')
		table.integer('idUser').references('id')
			.inTable('users')
			.notNull()
			.onDelete('CASCADE')
		table.boolean('activeExam')
	})
};

exports.down = function(knex) {
	return knex.schema.dropTable('examMedicalAfast')
};
