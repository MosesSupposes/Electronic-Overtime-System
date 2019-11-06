const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets')

function requireActiveSessionAndToken(req, res, next) {
    if (req.session && req.session.token) {
        jwt.verify(req.session.token, jwtSecret, (err, decodedToken) => {
            if (err) {
                const error = new Error('Invalid token.')
                error.status = 400
                next(error)
            } else {
                req.user = decodedToken.username
                next()
            }
        })
    } else {
        const err = new Error('You need to login to access this enpoint.')
        err.status = 401

        console.log('\n \n REQUEST FROM MIDDLEWARE:', req.session, '\n \n')
        
        next(err)

    }
}

module.exports = requireActiveSessionAndToken