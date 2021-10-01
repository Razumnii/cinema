const router = require('express').Router();
const Controller = require('../controllers');
const Middleware = require('../middleware');

router.get('/', Middleware.auth.checkStatus(10), Controller.session.getList);
router.get('/:id', Middleware.auth.checkStatus(10), Controller.session.getSingle);
router.post('/', Middleware.auth.checkStatus(10), Controller.session.create);
router.put('/:id', Middleware.auth.checkStatus(10), Controller.session.update);
router.delete('/:id', Middleware.auth.checkStatus(10), Controller.session.delete);

module.exports = router;
