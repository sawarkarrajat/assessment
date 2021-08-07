const { tokenGenerator } = require("../utilities/tokenGen");
const { sKey } = require('../configs/token.config');
const jwt = require('jsonwebtoken');

describe('testing token generator', () => {
	const payload = 'alkijijvserefsdsd';
	const token = tokenGenerator(payload);
	const reconverted = jwt.verify(token, sKey)._id;
	test('checking token is valid', () => {
		expect(reconverted).toMatch(payload);
	});

	test('checking token is not valid', () => {
		expect(reconverted).not.toMatch('sdfasdf');
	});
});