const router = require('express').Router();
const Controller = require('../controllers');
const Validation = require('../validations/');

router.get('/', Controller.user.getList);
router.get('/:id', Validation.user.getSingle , Controller.user.getSingle);
router.post('/',  Validation.user.create, Controller.user.create);
router.put('/:id',  Validation.user.update, Controller.user.update);
router.delete('/:id',  Validation.user.delete, Controller.user.delete);

module.exports = router;
