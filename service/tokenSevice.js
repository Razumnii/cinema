const { security } = require('../config')
const jwt = require('jsonwebtoken')

exports.generateAccessToken = (id) => {
	return jwt.sign({ id }, security.accessTokenSecret, { expiresIn: '24h' })
}

