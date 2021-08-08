// process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
describe('testing /user route apis', function () {
	test('testing add user api', function (done) {
		request(app)
			.post('/users/register')
			.send({
				"firstName": "test1",
				"lastName": "taj",
				"email": "test1.test1@gmail.com",
				"password": "abcdef"
			})
			.expect(200 || 409)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
	test('testing login user api', function (done) {
		request(app)
			.post('/users/login')
			.send({
				"email": "test1.test1@gmail.com",
				"password": "abcdef"
			})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
	test('testing forgotPassword password user api', function (done) {
		request(app)
			.post('/users/forgotPassword')
			.send({
				"email": "test1.test1@gmail.com"
			})
			.expect(200)
			.end(function (err, res) {
				if (err) return done(err);
				return done();
			});
	});
});
