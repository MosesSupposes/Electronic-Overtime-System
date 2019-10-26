const validateFields = require('./validateFields')

const requireUsernameAndPassword = validateFields(['username', 'password'])

module.exports = requireUsernameAndPassword