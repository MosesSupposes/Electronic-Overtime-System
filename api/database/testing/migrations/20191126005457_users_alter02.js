// SQLITE doesn't allow you to modify existing columns. The point of this migration was 
// to modify the email column to be not nullable
exports.up = function(knex) {
    return knex.schema.renameTable('users', 'users_old')
        .then(_ => {
            knex.schema.createTable('users', tbl => {
            tbl.increments()
            tbl.timestamps(true, true)
        
            tbl.string('email').notNullable()
            tbl.string('username', 20).notNullable().unique()
            tbl.string('password', 64).notNullable()
            // Roles are employee, supervisor, senior supervisor, admin
            tbl.string('role').notNullable().defaultTo('employee')
        })  
    })

};

exports.down = function(knex) {
    knex.schema.dropTableIfExists('users_old')
    return knex.schema.dropTableIfExists('users')
};
