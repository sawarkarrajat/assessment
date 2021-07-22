const { sKey } = require('../configs/token.config');
const jwt = require('jsonwebtoken');
/**
 * token Verifyer
 * @module tokenVerifyer
 */
module.exports = {
  /**
 * Token verifyer
 * @param {object} req - the request object containing token in header
 * @param {object} res - the response object
 * @param {object} next - the next object to continue the flow
 */
  tokenVerifyer(req, res, next) {
    const token = req.headers['token'] || req.params.token;
    console.log('\nvalue of token in token verifyer ', token);
    jwt.verify(token, sKey, function (err, decoded) {
      if (err) {
        console.log(err);
      } else {
        console.log('\nvalue of skey', sKey);
        console.log('\nvalue of decoded', decoded);
        console.log('\n value of req in verify token\n', req.body);

        req.decoded = decoded;
        next();
      }
    });
  }
};
