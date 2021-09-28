const { Pool } = require('pg');
const { dbConfig } = require('../config');

module.exports = async ({ sql, values }) => {
  try {
    const client = await new Pool(dbConfig).connect();
    const result = await client.query(sql, values);
    client.release();

    return result;
  } catch (e) {
    throw e;
  }
};
