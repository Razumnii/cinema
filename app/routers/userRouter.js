const router = require('express').Router();
const Controller = require('../controllers');
const Validation = require('../validations/');
const Middleware = require('../middleware');

router.get('/', Middleware.auth.checkStatus(10), Controller.user.getList);
router.get('/:id', Middleware.auth.checkStatus(10), Validation.user.getSingle, Controller.user.getSingle);
router.post('/', Middleware.auth.checkStatus(10), Validation.user.create, Controller.user.create);
router.put('/:id', Middleware.auth.checkStatus(10), Validation.user.update, Controller.user.update);
router.delete('/:id', Middleware.auth.checkStatus(10), Validation.user.delete, Controller.user.delete);

module.exports = router;
