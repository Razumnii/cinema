const { ctrl } = require('./template/baseController');
const { User } = require('../models');
const Utils = require('../service');
const { hash } = require('../service');

exports.getList = ctrl(async () => {
  const { rows } = await User.find();
  rows.forEach(rows => {
    delete rows.hash
  })
  return rows;
});

exports.getSingle = ctrl(async req => {
  const { id } = req.params;
  const { rows } = await User.find({ id });

  if (!rows[0]) {
    throw { message: 'mail is busy by another user' };
  }
  delete rows[0].hash

  return rows[0];
});

exports.create = ctrl(async req => {
  const { email, password, status } = req.body;

  const userCheck = await User.find({ email });

  if (userCheck.rowCount) {
    throw { message: 'mail is busy by another user' };
  }

  const hash = Utils.hash.create(email + password);

  const { rows } = await User.create({ email, hash, status });

  return rows[0];
});

exports.update = ctrl(async req => {
  const { id } = req.params;
  let { email, password, status } = req.body;

  const userCheck = await User.find({ id });

  if (userCheck.rowCount < 1) {
    throw { message: 'user not found' };
  }

  const modifier = {};

  if (email) {
    modifier.email = email;
  }

  if (status) {
    modifier.status = status;
  }
  if (password) {
    email = email || userCheck.rows[0].email;
    modifier.hash = Utils.hash.create(email + password);
  }

  const { rowCount } = await User.update({ id }, modifier);

  return Boolean(rowCount);
});

exports.delete = ctrl(async req => {
  const { id } = req.params;

  const userCheck = await User.find({ id });

  if (userCheck.rowCount < 1) {
    throw { message: 'user not found' };
  }

  const { rowCount } = await User.destroy({ id });

  return Boolean(rowCount);
});
