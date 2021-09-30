const { validator } = require('../service/');
const { isInteger, isEmail, isPassword } = validator;

exports.getSingle = (req, res, next) => {
  try {
    const { id } = req.params;

    isInteger(id, 'not valid param user id');

    next();
  } catch (e) {
    next(e);
  }
};

exports.create = (req, res, next) => {
  try {
    const { email, password, status } = req.body;

    isEmail(email);

    isPassword(password);

    if (status) {
      isInteger(status, 'not valid status');
    }

    next()
  } catch (e) {
    next(e);
  }
};

exports.update = (req, res, next) => {
  try {
    const { email, password, status } = req.body;
    const { id } = req.params

    isInteger(id, 'not valid param user id')

    if (email) {
      isEmail(email);
    }


    if (password) {
      isPassword(password);
    }


    if (status) {
      isInteger(status, 'not valid status');
    }

    next()
  } catch (e) {
    next(e);
  }
};

exports.delete = (req, res, next) => {
  try {
    const { id } = req.params;

    isInteger(id, 'not valid param user id');

    next();
  } catch (e) {
    next(e);
  }
};
