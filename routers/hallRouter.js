const router = require('express').Router()
const Controller = require('../controllers')


router.get('/', Controller.hall.getList)
router.get('/:id', Controller.hall.getSingle)
router.post('/', Controller.hall.create)
router.put('/:id', Controller.hall.update)
router.delete('/:id', Controller.hall.delete)

module.exports = router