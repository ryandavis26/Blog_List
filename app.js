const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/bloglist')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)
logger.info("connecting to the DB")

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to the DB')
  })
  .catch((error) => {
    logger.error("error connecting MongoDb", error.message)
  })

app.use(cors())
//app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
