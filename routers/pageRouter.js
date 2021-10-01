const router = require('express').Router();
const Middleware = require('../middleware')


router.get('/', (req, res) => {
  const { user } = req;
  res.render('index', { user });
});

router.get('/login', (req, res) => {
  const { user } = req;
  res.render('login', { user });
});

router.get('/users', Middleware.auth.checkStatus(10), (req, res) => {
  const { user } = req;
  res.render('users', { user });
});

router.get('/films', Middleware.auth.checkStatus(10), (req, res) => {
  const { user } = req;
  res.render('films', { user });
});

router.get('/films/:id', (req, res) => {

});

module.exports = router;
