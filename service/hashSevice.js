const crypto = require('crypto');
const {
  security: { hashSecret },
} = require('../config');

const create = (str, algo = 'sha256') => {
  return crypto.createHmac(algo, hashSecret).update(str).digest('hex');
};

exports.create = create;

exports.equal = (str, hashCheck) => create(str) === hashCheck;
