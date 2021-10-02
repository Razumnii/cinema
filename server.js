const express = require('express');

const Config = require('./app/config');
const Router = require('./app/routers');
const { dbManeger } = require('./app/service');

const app = Config.express(express);
const { PORT = 3000 } = Config.server;
dbManeger.init()

app.use(Router);

app.listen({ port: PORT }, () => {
  console.log(`Server started listening for requests on port ${PORT}`);
});
