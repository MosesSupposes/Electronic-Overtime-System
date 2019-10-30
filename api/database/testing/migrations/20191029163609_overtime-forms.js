
exports.up = function(knex) {
    return knex.schema.createTable('overtime-forms', tbl => {
        tbl.increments()
        tbl.timestamps(true, true)
  
        tbl.integer('employeedId')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
  
        tbl.date('todaysDate').notNullable()
        tbl.string('workersName').notNullable()
        tbl.string('client').notNullable()
        tbl.string('reasonForOvertime').notNullable()
        tbl.date('dateOfAppointment').notNullable()
        tbl.string('anticipatedLength').notNullable()
        tbl.string('compTime').notNullable()
        tbl.string('payment').notNullable()
        tbl.date('dateOvertimeOccurred').notNullable()
        tbl.string('hoursWorkedFrom').notNullable()
        tbl.string('hoursWorkedTo').notNullable()
        tbl.string('regularWorkdayStartTime').notNullable()
        tbl.string('supervisor').notNullable()
        tbl.string('seniorSupervisor').notNullable()
  
        tbl.string('supervisorsInitials')
        
        tbl.string('signature').notNullable()
    })
  };
  
  exports.down = function(knex) {
  return knex.schema.dropTableIfExists('overtime-forms')
  };
  