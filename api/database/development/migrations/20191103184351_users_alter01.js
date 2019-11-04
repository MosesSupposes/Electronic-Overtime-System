
exports.up = function(knex) {
    return knex.schema.table('users', tbl => {
        tbl.string('email')
        // Roles are employee, supervisor, senior supervisor, admin
        tbl.string('role').defaultTo('employee')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
