const { ctrl } = require('./template/baseController');
const { User } = require('../models');
const { hash, token } = require('../service');


exports.login = ctrl(async (req, next) => {
	const { email, password } = req.body;

	const userCheck = await User.find({ email });
	if (!userCheck.rowCount) {
		throw { message: 'wrong authorization keys' };
	}
	const equalPassword = hash.equal(email + password, userCheck.rows[0].hash)

	if (!equalPassword) {
		throw { message: 'wrong authorization keys' };
	}
	return token.generateAccessToken(userCheck.rows[0].id);
});





