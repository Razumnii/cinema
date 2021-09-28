const router = require('express').Router()
const Controller = require('../controllers')

router.post('/login', Controller.security.login)

module.exports = router