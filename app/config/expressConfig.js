const cookie = require('cookie-parser');
module.exports = express => {
  const app = express()


  // by default I still have this code here
  app.set('views', './views')
  app.set('view engine', 'ejs')
  app.use('/public', express.static('./public'))
  app.use(cookie())


  app.disable('x-powered-by')
  app.use(express.json())
  app.use((err, req, res, next) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: 'json parse error' })
    }
    next()
  })

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, Origin')
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')

      return res.status(200).json()
    }
    next()
  })

  return app
}
