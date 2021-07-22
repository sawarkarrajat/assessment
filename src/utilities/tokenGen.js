const { sKey } = require('../configs/token.config');
const jwt = require('jsonwebtoken');

module.exports = {
  tokenGenerator(justId) {
    console.log('\nvalue of body in token generator', justId);

    let payload = { _id: justId };
    console.log('\nvalue of payload', payload);

    let token = jwt.sign(payload, sKey);

    console.log('\nvalue of token after generation', token);
    console.log(
      '\nvalue of token after reconversion',
      jwt.verify(token, sKey)._id
    );

    return token;
  }
};
