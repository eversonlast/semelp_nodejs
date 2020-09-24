
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table){
        table.string('passwordResetToken')
        table.date('passwordResetExpired')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table){
        table.dropColumn('passwordResetToken')
        table.dropColumn('passwordResetExpired')
    })
};
