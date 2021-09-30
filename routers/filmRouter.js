const router = require('express').Router()
const Controller = require('../controllers')
const Validation = require('../validations')


router.get('/', Controller.film.getList)
router.get('/:id', Validation.film.getSingle, Controller.film.getSingle)
router.post('/', Validation.film.create, Controller.film.create)
router.put('/:id', Validation.film.update, Controller.film.update)
router.delete('/:id', Validation.film.delete, Controller.film.delete)

module.exports = router
