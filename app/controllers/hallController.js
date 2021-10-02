const { ctrl } = require('./template/baseController');
const { Hall } = require('../models');
const Utils = require('../service');

exports.getList = ctrl(async () => {
	const { rows } = await Hall.find();

	return rows;
});

exports.getSingle = ctrl(async req => {
	const { id } = req.params;
	const { rows } = await Hall.find({ id });

	if (!rows[0]) {
		throw { message: 'hall not found' };
	}
	return rows[0];
});

exports.create = ctrl(async req => {
	const { name, count_seats, count_rows } = req.body;

	const hallCheck = await Hall.find({ name });

	if (hallCheck.rowCount) {
		throw { message: 'A hall with the same name already exists' };
	}

	const { rows } = await Hall.create({ name, count_seats, count_rows });

	return rows[0];
});

exports.update = ctrl(async req => {
	const { id } = req.params;
	const { name, count_seats, count_rows } = req.body;

	const hallCheck = await Hall.find({ id });

	if (hallCheck.rowCount < 1) {
		throw { message: 'hall not found' };
	}

	const modifier = {};

	if (name) {
		modifier.name = name;
	}
	if (count_seats) {
		modifier.count_seats = count_seats;
	}
	if (count_rows) {
		modifier.count_rows = count_rows;
	}

	const { rowCount } = await Hall.update({ id }, modifier);

	return Boolean(rowCount);
});

exports.delete = ctrl(async req => {
	const { id } = req.params;

	const hallCheck = await Hall.find({ id });

	if (hallCheck.rowCount < 1) {
		throw { message: 'hall not found' };
	}

	const { rowCount } = await Hall.destroy({ id });

	return Boolean(rowCount);
});
