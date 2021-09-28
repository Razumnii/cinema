const { security } = require('../config')
const jwt = require('jsonwebtoken')

exports.generateAccessToken = (id) => {
	return jwt.sign({ id }, security.accessTokenSecret, { expiresIn: '24h' })
}


















/*
const app = agent(createApp());

test('User can successfully login', async t => {
	const res = await app.post('/security/login').send({
		login: 'user',
		password: 'user',
	});
	t.is(res.status, 200);
	t.truthy(typeof res.body.token === 'string');
	t.truthy(typeof res.body.refreshToken === 'string');
})
test.todo('User gets 403 on invalid credentials');// Получает 403 если некоректный логин.
test.todo('User receives 401  on expired token');// Получает 401 если токен протух.
test.todo('User can refresh access token using refresh token');// Может поменять access используя refresh token.
test.todo('User can use refresh token only once');// Refresh token может использоваться только 1 раз.
test.todo('Refresh tokens become invalid on logout');// При logout все refresh token становятся invalid.
test.todo('Multiply refresh tokens are valid');// У пользователя может быть несколько resresh tokens.
*/