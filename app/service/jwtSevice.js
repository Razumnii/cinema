const { security } = require('../config');
const jwt = require('jsonwebtoken');

exports.generateAccessToken = id => {
  return jwt.sign({ id }, security.accessTokenSecret, { expiresIn: '24h' });
};

exports.verifyAccessToken = token => {
  try {
    return jwt.verify(token, security.accessTokenSecret);
  } catch (e) {
    console.error(e.message);
    return false;
  }
};
