const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const eventRouter = require('./routes/events')
const userRouter = require('./routes/user')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/events', eventRouter)

app.use('/api/user', userRouter)

app.use(express.static(path.join(__dirname, '../client/build')))
app.get("*", function(_, res) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if(err) {
        res.status(500).send(err)
      }
    }
  )
})

module.exports = app
