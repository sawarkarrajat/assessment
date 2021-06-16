const bcrypt = require('bcrypt');

module.exports = {
  /**
   *
   * @param {String} password this method is used to encrypt password
   */
  encryptPass(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
};
