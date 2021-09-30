const { validator } = require('../service/');
const { isInteger, isTime, checkLength } = validator;

exports.getSingle = (req, res, next) => {
  try {
    const { id } = req.params;

    isInteger(id, 'not valid param film id');

    next();
  } catch (e) {
    next(e);
  }
};

exports.create = (req, res, next) => {
  try {
    const { name, premier, description } = req.body;

    checkLength(name, {
      min: 1,
      max: 50,
    })

    isTime(premier, 'YYYY-MM-DD')


    checkLength(description, {
      max: 1000,
    })

    next();
  } catch (e) {
    next(e);
  }
};

exports.update = (req, res, next) => {
  try {
    const { name, premier, description } = req.body;
    const { id } = req.params

    isInteger(id, 'not valid param film id')

    if (name) {
      checkLength(name, {
        min: 1,
        max: 50,
      })
    }

    if (premier) {
      isTime(premier, 'YYYY-MM-DD')
    }

    if (description) {
      checkLength(description, {
        max: 1000,
      })
    }


    next();
  } catch (e) {
    next(e);
  }
};

exports.delete = (req, res, next) => {
  try {
    const { id } = req.params;

    isInteger(id, 'not valid param film id');

    next();
  } catch (e) {
    next(e);
  }
};
