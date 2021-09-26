const router = require('express').Router();

const filmRouter = require('./filmRouter');
const userRouter = require('./userRouter');
const hallRouter = require('./hallRouter');
const sessionRouter = require('./sessionRouter');
const ticketRouter = require('./ticketRouter');
const pageRouter = require('./pageRouter');

router.use('/', pageRouter);
router.use('/film', filmRouter);
router.use('/user', userRouter);
router.use('/hall', hallRouter);
router.use('/session', sessionRouter);
router.use('/ticket', ticketRouter);

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
