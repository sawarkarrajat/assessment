const userModelObj = require('../models/userModel');
const utility = require('../utilities/utility');
const token = require('../utilities/tokenGen');
const bcrypt = require('bcrypt');
let tok;

class UserService {
  returnToken() {
    return tok;
  }
  //register service
  registerUser(body, callback) {
    console.log(' request in create service ');
    let mail = { email: body.email };
    userModelObj.findUser(mail, (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (!result) {
          userModelObj.createUser(body, (err, data) => {
            if (err) {
              callback(err);
            } else {
              callback(null, data);
            }
          });
        } else {
          callback(result);
        }
      }
    });
  }
  // login service
  loginUser(body, callback) {
    console.log(' request in login service ');
    let mail = { email: body.email };

    userModelObj.findUser(mail, (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (!result) {
          callback({ message: 'no data found' });
        } else {
          console.log('value of result', result);
          console.log('value of result id', result._id);
          console.log('value of body', body.password);
          console.log(
            'after bcrypt reconversion',
            bcrypt.compareSync(body.password, result.password)
          );

          if (bcrypt.compareSync(body.password, result.password)) {
            console.log('value of body in if', body);
            console.log('value of result in if', result);

            let tokenvalue = token.tokenGenerator(result._id);
            tok = tokenvalue;
            console.log('token generated:  ', tokenvalue);
            callback(null, result);
          } else {
            callback({ message: "passwords don't match" });
          }
        }
      }
    });
  }

  /**
   * forgot password service method
   */
  forgotPasswordUser(body, callback) {
    console.log('request in forgot password service ');
    userModelObj.findUser(body, (err, result) => {
      if (err) {
        callback(err);
      } else {
        if (!result) {
          console.log('result:', result);
          callback({ message: "user doesn't exist please register first" });
        } else {
          console.log('value of result', result);
          console.log('value of body', body);
          userModelObj.verifyUser(result, (error, data) => {
            if (error) {
              callback(error);
            } else {
              console.log('data recieved after verify user', data);

              callback(null, data);
            }
          });
        }
      }
    });
  }
  /**
   * forgot password service method
   */
  resetPasswordUser(userNewPass, userId, callback) {
    // var uId = { '_id': id };
    console.log(
      ' request in resetPasswordUser service\n value of password ' +
        userNewPass +
        '\nvalue of id ' +
        userId
    );
    userModelObj.findUser(userId, (err, result) => {
      if (err) {
        console.log('caught in error finding user');

        callback(err);
      } else {
        if (!result) {
          callback({ message: "user doesn't exist please register first" });
        } else {
          console.log('value of result', result);
          console.log('value of id', userId);
          userModelObj.changePassword(userNewPass, userId, (error, data) => {
            if (error) {
              callback(error);
            } else {
              callback(null, data);
            }
          });
        }
      }
    });
  }

}
module.exports = new UserService();
