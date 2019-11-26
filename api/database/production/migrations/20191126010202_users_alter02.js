// This migration will make the `email` and `role` fields on the `users` table not nullable
exports.up = function(knex) {
  return knex.schema.alterTable('users', tbl => {
    tbl.string('email')
        .notNullable()
        .alter()
        
    tbl.string('role')
        .notNullable()
        .defaultTo('employee')
        .alter()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
