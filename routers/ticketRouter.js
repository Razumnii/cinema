const router = require('express').Router()
const Controller = require('../controllers')


router.get('/', Controller.ticket.getList)
router.get('/:id', Controller.ticket.getSingle)
router.post('/', Controller.ticket.create)
router.put('/:id', Controller.ticket.update)
router.delete('/:id', Controller.ticket.delete)

module.exports = router