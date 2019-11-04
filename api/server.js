/**
 * Dependencies 
 */

// npm packages.
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const sessions = require('express-session')
const KnexSessionStore = require('connect-session-knex')(sessions)
const R = require('ramda')

// Routers
const authRouter = require('./routes/authRouter')
const usersRouter = require('./routes/usersRouter')


const sessionConfiguration = {
    name: 'electronic-overtime-system',
    secret: process.env.SESSION_SECRET || 'this is not secret',
    cookie: {
      httpOnly: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 1000 * 60 * 60, // sessions last for one hour
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
    resave: false,
    saveUninitialized: true,
    store: new KnexSessionStore({
      knex: require('./database/dbClient'),
      createtable: true,
      clearInterval: 1000 * 60 * 30 // delete expired sessions every 30 min
    })
  }


/**
 * Define Server
 */
  
const server = express()


/**
 * Middleware
 */

server.use(express.json())
server.use(sessions(sessionConfiguration))
server.use(helmet())
server.use(cors())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' })
})

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)

server.use(function notFound(req, res, next) {
    const error = new Error('Not found.')
    error.status = 404

    next(error)
})

server.use(function errorHandler(error, req, res, next) {
    error.message = R.propOr('Internal server error.', 'message', error)
    error.status = R.propOr('500', 'status', error)

    res.status(error.status).json({ error: { message: error.message } })
})


/**
 * Export server
 */

module.exports = server