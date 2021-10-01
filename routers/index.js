const router = require('express').Router();

const filmRouter = require('./filmRouter');
const userRouter = require('./userRouter');
const hallRouter = require('./hallRouter');
const sessionRouter = require('./sessionRouter');
const ticketRouter = require('./ticketRouter');
const securityRouter = require('./securityRouter');
const pageRouter = require('./pageRouter');
const { auth } = require('../middleware');
const { checkUserSignin } = auth;

router.use('/api', securityRouter);

router.use('*', checkUserSignin);



router.use('/api/film', filmRouter);
router.use('/api/user', userRouter);
router.use('/api/hall', hallRouter);
router.use('/api/session', sessionRouter);
router.use('/api/ticket', ticketRouter);

router.use('/', pageRouter);

router.use((req, res) => {
  const message = `Not found for url ${req.url}`;
  console.error(message);
  res.json({ message });
});

router.use((err, req, res, next) => {
  console.error(err);

  const { status = 400, message = 'Undefined error' } = err;

  res.status(status).json({ message });
});

module.exports = router;
