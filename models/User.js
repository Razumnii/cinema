const jsql = require('json-sql')({ namedValues: false });
const { pg } = require('../utils');
const table = 'users';

exports.find = (condition = {}, otions = {}) => {
  const sql = jsql.build({
    type: 'select',
    table,
    condition,
    ...otions,
  });

  return pg({
    sql: sql.query,
    values: sql.values,
  });
};

exports.create = values => {
  const sql = jsql.build({
    type: 'insert',
    table,
    values,
    returning: ['id'],
  });

  return pg({
    sql: sql.query,
    values: sql.values,
  });
};

exports.update = (condition, modifier) => {
  const sql = jsql.build({
    type: 'update',
    table: 'users',
    condition,
    modifier,
  });

  return pg({
    sql: sql.query,
    values: sql.values,
  });
};

exports.destroy = (condition = {}) => {
  const sql = jsql.build({
    type: 'remove',
    table,
    condition,
  });

  return pg({
    sql: sql.query,
    values: sql.values,
  });
};
