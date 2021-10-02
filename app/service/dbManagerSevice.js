'use strict';
const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');
const { dbConfig } = require('../config');

exports.init = () => {
  const params = dbConfig[process.env.NODE_ENV || 'development'];

  const db = new Sequelize(params.database, params.login, params.password, params.options);

  try {
    db.authenticate();

    const pathModelFolder = path.resolve(__dirname, '../models');

    fs.readdirSync(pathModelFolder)
      .filter(file => {
        return file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.js';
      })
      .map(file => {
        const { init } = require(path.resolve(pathModelFolder, file));
        if (init && typeof init === 'function') {
          return init(db);
        }
      });

    for (const key in db.models) {
      const { link } = db.models[key];

      if (link) {
        link();
      }
    }

    db.sync({ alter: true });
  } catch (e) {
    console.error(e);
  }
};
