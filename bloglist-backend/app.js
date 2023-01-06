const express = require('express')

const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const { MONGODB_URI } = require('./utils/config')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const commentRouter = require('./controllers/comments')
const logger = require('./utils/logger')
const {
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware')

app.use(morgan('short'))

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logger.success('Connected to database')
  })
  .catch(err => {
    logger.error('Failed to connect to database:', err.message)
  })

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/comments', commentRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// Test middleware
app.use('/error', () => {
  throw new Error('testing error')
})

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
