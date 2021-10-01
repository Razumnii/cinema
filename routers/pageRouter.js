const router = require('express').Router();
const Middleware = require('../middleware')


router.get('/', (req, res) => {
  const { user } = req;
  res.render('index', { user });
});

router.get('/about', (req, res) => {
  const { user } = req;
  res.render('about', { user });
});

router.get('/login', (req, res) => {
  const { user } = req;
  res.render('login', { user });
});

router.get('/user', Middleware.auth.checkStatus(10), (req, res) => {
  const { user } = req;
  res.render('user', { user });
});

router.get('/film', Middleware.auth.checkStatus(10), (req, res) => {
  const { user } = req;
  res.render('film', { user });
});

router.get('/film/:id', (req, res) => {

});

module.exports = router;
