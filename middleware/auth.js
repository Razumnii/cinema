const { fieldTokenName } = require('../config').security;
const { verifyAccessToken } = require('../service').jwt;

const { User } = require('../models');

exports.checkUserSignin = async (req, res, next) => {
  try {
    const checkToken = verifyAccessToken(req.cookies[fieldTokenName]);

    if (!checkToken) {
      return next();
    }

    const { id } = checkToken;

    const userCheck = await User.find({ id });

    if (!userCheck.rowCount) {
      throw { message: 'user not found' };
    }
    const user = userCheck.rows[0];

    if (!user.status) {
      throw { message: 'user status undefined' };
    }

    if (user.status === -1) {
      throw { message: 'this user deleted' };
    }

    if (user.status === 0) {
      throw { message: 'this user is banned' };
    }

    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};
exports.checkStatus = accessStatus => (req, res, next) => {
  try {
    if (!accessStatus) {
      return next()
    }

    const { user } = req;

    if (!user) {
      return res.render('login')
    }

    const { status } = user;

    if (status >= accessStatus) {
      return next()
    }

    throw { message: 'Not permission'}
  } catch (e) {
    next(e)
  }
};
