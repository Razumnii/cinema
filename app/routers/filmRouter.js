const router = require('express').Router()
const Controller = require('../controllers')
const Validation = require('../validations')
const Middleware = require('../middleware')


router.get('/', Controller.film.getList)
router.get('/:id', Middleware.auth.checkStatus(10), Validation.film.getSingle, Controller.film.getSingle)
router.post('/', Middleware.auth.checkStatus(10), Validation.film.create, Controller.film.create)
router.put('/:id', Middleware.auth.checkStatus(10), Validation.film.update, Controller.film.update)
router.delete('/:id', Middleware.auth.checkStatus(10), Validation.film.delete, Controller.film.delete)

module.exports = router
