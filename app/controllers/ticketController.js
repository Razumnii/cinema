const { ctrl } = require('./template/baseController');
const { Ticket } = require('../models');
const Utils = require('../service');

exports.getList = ctrl(async () => {
	const { rows } = await Ticket.find();

	return rows;
});

exports.getSingle = ctrl(async req => {
	const { id } = req.params;
	const { rows } = await Ticket.find({ id });

	if (!rows[0]) {
		throw { message: 'ticket not found' };
	}
	return rows[0];
});

exports.create = ctrl(async req => {
	const { userId, seansId, space } = req.body;


	const { rows } = await Ticket.create({ user_id: userId, seans_id: seansId, space });

	return rows[0];
});

exports.update = ctrl(async req => {
	const { id } = req.params;
	const { userId, seansId, space } = req.body;

	const ticketCheck = await Ticket.find({ id });

	if (ticketCheck.rowCount < 1) {
		throw { message: 'Ticket not found' };
	}

	const modifier = {};

	if (userId) {
		modifier.user_id = userId;
	}
	if (seansId) {
		modifier.seans_id = seansId;
	}
	if (space) {
		modifier.space = space;
	}

	const { rowCount } = await Ticket.update({ id }, modifier);

	return Boolean(rowCount);
});

exports.delete = ctrl(async req => {
	const { id } = req.params;

	const ticketCheck = await Ticket.find({ id });

	if (ticketCheck.rowCount < 1) {
		throw { message: 'ticket not found' };
	}

	const { rowCount } = await Ticket.destroy({ id });

	return Boolean(rowCount);
});
