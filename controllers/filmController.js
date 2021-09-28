const { ctrl } = require('./template/baseController');
const { Film } = require('../models');
const Utils = require('../service');

exports.getList = ctrl(async () => {
	const { rows } = await Film.find();

	return rows;
});

exports.getSingle = ctrl(async req => {
	const { id } = req.params;
	const { rows } = await Film.find({ id });

	if (!rows[0]) {
		throw { message: 'film not found' };
	}
	return rows[0];
});

exports.create = ctrl(async req => {
	const { name, premier, rating, time } = req.body;

	const filmCheck = await Film.find({ name });

	if (filmCheck.rowCount) {
		throw { message: 'such a film already exists' };
	}

	const { rows } = await Film.create({ name, premier, rating, time });

	return rows[0];
});

exports.update = ctrl(async req => {
	const { id } = req.params;
	const { name, premier, rating, time } = req.body;

	const filmCheck = await Film.find({ id });

	if (filmCheck.rowCount < 1) {
		throw { message: 'Film not found' };
	}

	const modifier = {};

	if (name) {
		modifier.name = name;
	}
	if (premier) {
		modifier.premier = premier;
	}
	if (rating) {
		modifier.rating = rating;
	}
	if (time) {
		modifier.time = time;
	}

	const { rowCount } = await Film.update({ id }, modifier);

	return Boolean(rowCount);
});

exports.delete = ctrl(async req => {
	const { id } = req.params;

	const filmCheck = await Film.find({ id });

	if (filmCheck.rowCount < 1) {
		throw { message: 'film not found' };
	}

	const { rowCount } = await Film.destroy({ id });

	return Boolean(rowCount);
});
