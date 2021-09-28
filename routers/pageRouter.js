const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/user', (req, res) => {
  res.render('user');
});

router.get('/film', (req, res) => {
  res.render('film');
});

module.exports = router;
