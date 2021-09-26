const router = require('express').Router()

router.get('/', (req, res) => {
  res.render("index")
})

router.get('/login', (req, res) => {
  res.render("login")
})

router.get('/film', (req, res) => {
  res.render("film")
})


module.exports = router
