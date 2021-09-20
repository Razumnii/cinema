const router = require('express').Router()
const Controller = require('../controllers')


router.get('/', Controller.session.getList)
router.get('/:id', Controller.session.getSingle)
router.post('/', Controller.session.create)
router.put('/:id', Controller.session.update)
router.delete('/:id', Controller.session.delete)

module.exports = router