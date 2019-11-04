
exports.up = function(knex) {
    return knex.schema.table('overtime-forms', tbl => {
        tbl.renameColumn('employeedId', 'employeeId')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('overtime-forms')
};
