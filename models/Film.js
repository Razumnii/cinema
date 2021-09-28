const jsql = require('json-sql')({ namedValues: false });
const { pg } = require('../service');
const table = 'film';

exports.find = (condition = {}, options = {}) => {
	const sql = jsql.build({
		type: 'select',
		table,
		condition,
		...options,
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
		table: table,
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
