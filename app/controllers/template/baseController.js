exports.ctrl = handler => {
  return async (req, res, next) => {
    try {

      const data = await handler(req, next);

      console.log('fuck1', next);

      res.json(data);
    } catch (e) {
      console.error(e);
      next(e);
    }
  };
};

'use strict';

const STATUS_READY = 'ready';
const STATUS_NEXT = 'next';

exports.ctrl = handler => {
  return (req, res, next) => {
    let currStatus = STATUS_READY;

    const nextFunc = data => {
      currStatus = STATUS_NEXT;
      next(data);
    };

    const ret = handler(req, nextFunc);
    ret
      .then(data => {
        if (currStatus !== STATUS_NEXT) {
          res.send(data);
        }
      })
      .catch(err => {
        console.error(err);
        next(err);
      });
  };
};

