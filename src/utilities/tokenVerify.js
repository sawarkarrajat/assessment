const { sKey } = require('../configs/token.config');
const jwt = require('jsonwebtoken');
const userModelObj = require('../models/userModel');
const mongoose = require('mongoose');

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
    if (!token) {
      let response = {};
      response.status = false;
      response.message = 'Token undefined - please add token to headers in the request';
      res.status(500).send(response);
      return;
    }
    jwt.verify(token, sKey, function (err, decoded) {
      if (err) {
        console.log(err);
      } else {
        console.log('\nvalue of skey', sKey);
        console.log('\nvalue of decoded', decoded);
        console.log('\n value of req in verify token\n', req.body);
        const mongoose = require('mongoose');
        decoded = { _id: mongoose.Types.ObjectId(decoded._id) };
        userModelObj.findUser(decoded, (err, result) => {
          if (err) {
            console.log('err: ', err);
          }
          if (result) {
            console.log('result: ', result);
            req.body.userId = decoded._id;
            next();
          }
        });
      }
    });
  }
};
