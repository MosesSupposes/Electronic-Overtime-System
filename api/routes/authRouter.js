const express = require('express')

const AuthController = require('../controllers/AuthController')
const validateFields = require('../middleware/validateFields')
const requireUsernameAndPassword = require('../middleware/requireUsernameAndPassword')

const router = express.Router()

router.post('/register', validateFields(['username', 'password', 'email']), AuthController.register)
router.post('/login', requireUsernameAndPassword,  AuthController.login)
router.get('/logout', AuthController.logout)

module.exports = router