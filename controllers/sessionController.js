const { ctrl } = require('./template/baseController');
const { Session } = require('../models');
const Utils = require('../service');

exports.getList = ctrl(async () => {
	const { rows } = await Session.find();

	return rows;
});

exports.getSingle = ctrl(async req => {
	const { id } = req.params;
	const { rows } = await Session.find({ id });

	if (!rows[0]) {
		throw { message: 'session not found' };
	}
	return rows[0];
});

exports.create = ctrl(async req => {
	const { price, hallId, filmId, date } = req.body;

	const sessionCheck = await Session.find({ hall_id: hallId, film_id: filmId, date });

	if (sessionCheck.rowCount) {
		throw { message: 'sessions cannot be for the same time in the same hall' };
	}

	const { rows } = await Session.create({ price, hall_id: hallId, film_id: filmId, date });

	return rows[0];
});

exports.update = ctrl(async req => {
	const { id } = req.params;
	const { price, hallId, filmId, date } = req.body;

	const sessionCheck = await Session.find({ id });

	if (sessionCheck.rowCount < 1) {
		throw { message: 'Session not found' };
	}

	const modifier = {};

	if (price) {
		modifier.price = price;
	}
	if (hallId) {
		modifier.hall_id = hallId;
	}
	if (filmId) {
		modifier.film_id = filmId;
	}
	if (date) {
		modifier.date = date;
	}

	const { rowCount } = await Session.update({ id }, modifier);

	return Boolean(rowCount);
});

exports.delete = ctrl(async req => {
	const { id } = req.params;

	const sessionCheck = await Session.find({ id });

	if (sessionCheck.rowCount < 1) {
		throw { message: 'session not found' };
	}

	const { rowCount } = await Session.destroy({ id });

	return Boolean(rowCount);
});