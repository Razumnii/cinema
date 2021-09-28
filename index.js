require('dotenv').config()

const express = require('express')

const Config = require('./config')
const Router = require('./routers')
console.log()

const app = Config.express(express)
const { PORT = 3000 } = Config.server

app.use(Router)


app.listen({ port: PORT }, () => {
  console.log(`Server started listening for requests on port ${PORT}`)

})

