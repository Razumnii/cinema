const router = require('express').Router()
const Controller = require('../controllers')


router.get('/', Controller.user.getList)
router.get('/:id', Controller.user.getSingle)
router.post('/', Controller.user.create)
router.put('/:id', Controller.user.update)
router.delete('/:id', Controller.user.delete)

module.exports = router
