const router = require('express').Router()
const Controller = require('../controllers')


router.get('/', Controller.film.getList)
router.get('/:id', Controller.film.getSingle)
router.post('/', Controller.film.create)
router.put('/:id', Controller.film.update)
router.delete('/:id', Controller.film.delete)

module.exports = router
