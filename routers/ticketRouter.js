const router = require('express').Router();
const Controller = require('../controllers');
const Middleware = require('../middleware');

router.get('/', Middleware.auth.checkStatus(10), Controller.ticket.getList);
router.get('/:id', Middleware.auth.checkStatus(10), Controller.ticket.getSingle);
router.post('/', Middleware.auth.checkStatus(10), Controller.ticket.create);
router.put('/:id', Middleware.auth.checkStatus(10), Controller.ticket.update);
router.delete('/:id', Middleware.auth.checkStatus(10), Controller.ticket.delete);

module.exports = router;
