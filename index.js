const express = require('express')
console.log('fuck');
const Config = require('./config')
const Router = require('./routers')


const app = Config.express(express)
const { PORT = 3000 } = Config.server

app.use(Router)


app.listen({ port: PORT }, () => {
  console.log(`Server started listening for requests on port ${PORT}`)

})

