const { security } = require('../config');
const { fieldTokenName } = security;
const { User } = require('../models');
const { hash, jwt } = require('../service');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;


    const userCheck = await User.find({ email });
    if (!userCheck.rowCount) {
      throw { message: 'wrong authorization keys' };
    }
    const equalPassword = hash.equal(email + password, userCheck.rows[0].hash);

    if (!equalPassword) {
      throw { message: 'wrong authorization keys' };
    }

    const token = jwt.generateAccessToken(userCheck.rows[0].id);

    res.cookie(fieldTokenName, token).json('OK');
  } catch (e) {
    next(e);
  }
};
