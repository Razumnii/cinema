const router = require('express').Router();

router.get('/', (req, res) => {
  const { user } = req;
  res.render('index', { user });
});

router.get('/login', (req, res) => {
  const { user } = req;
  res.render('login', { user });
});

router.get('/users', (req, res) => {
  const { user } = req;
  res.render('users', { user });
});

router.get('/films', (req, res) => {
  const { user } = req;
  res.render('films', { user });
});

router.get('/films/:id', (req, res) => {

});

module.exports = router;
