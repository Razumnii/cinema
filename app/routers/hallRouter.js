const router = require('express').Router();
const Controller = require('../controllers');
const Middleware = require('../middleware');

router.get('/', Middleware.auth.checkStatus(10), Controller.hall.getList);
router.get('/:id', Middleware.auth.checkStatus(10), Controller.hall.getSingle);
router.post('/', Middleware.auth.checkStatus(10), Controller.hall.create);
router.put('/:id', Middleware.auth.checkStatus(10), Controller.hall.update);
router.delete('/:id', Middleware.auth.checkStatus(10), Controller.hall.delete);

module.exports = router;
