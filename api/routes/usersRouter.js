const express = require('express')

const UsersController = require('../controllers/UsersController')
const requireUsernameAndPassword = require('../middleware/requireUsernameAndPassword')
const requireActiveSessionAndToken = require('../middleware/requireActiveSessionAndToken')

const router = express.Router()

router.use(requireActiveSessionAndToken)

router.get('/', UsersController.allUsers)

router.route('/:username')
    .get(requireUsernameAndPassword, UsersController.getByUsername)
    .put(requireUsernameAndPassword, UsersController.updateByUsername)
    .delete(UsersController.deleteByUsername)

module.exports = router