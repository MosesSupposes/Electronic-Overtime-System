const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UsersModel = require('../models/UsersModel')
const { jwtSecret } = require('../config/secrets')


function generateToken(user) {
    const payload = {
        username: user.username,
        subject: user.id,
    }
    const options = { expiresIn: '1h' }

    return jwt.sign(payload, jwtSecret, options)
}

class AuthController {
    static async register(req, res) {
        try {
            const newUser = await UsersModel.create(req.body)
            res.status(201).json({
                success: `Welcome ${newUser.username}!`,
                user: newUser,
                token: generateToken(newUser)
            })
        } catch(e) {
            res.status(400).json({ error: { message: "A user with this name already exists." } })
        }
    }

    static async login(req, res) {
        try {
            const user = await UsersModel.findByUsername(req.body.username)
            bcrypt.compare(req.body.password, user.password, (err, passwordsMatch) => {
                if (err) res.status(500).json({ error: { message: 'Internal server error.' } })
                else if (!passwordsMatch) res.status(400).json({ error: { message: "Invalid password." } })
                else res.status(200).json({
                    success: `Welcome ${newUser.username}!`,
                    user,
                    token: generateToken(user)
                })
            })
        } catch(e) {
            res.status(500).json({ error: { message: "Invalid credentials." } })
        }
    }

    static async logout(req, res) {
        req.session.destroy(err => {
            if (err) res.status(500).json({ error: { message: "Internal server error." } })
            else res.status(200).json({message: "Goodbye! 👋🏾"})
        })
    }
}

module.exports = AuthController