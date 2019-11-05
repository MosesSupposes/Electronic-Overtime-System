const express = require('express')

const AuthController = require('../controllers/AuthController')
const validateFields = require('../middleware/validateFields')

const router = express.Router()

router.post('/register', validateFields(['username', 'password', 'email']), AuthController.register)
router.post('/login', validateFields(['username', 'password']),  AuthController.login)
router.get('/logout', AuthController.logout)

module.exports = router