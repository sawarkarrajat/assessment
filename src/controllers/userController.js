// const User = require("../models/register.model.js");
const userServiceObj = require('../services/userService');

class UserController {
  /**
   * create user controller method
   */
  create(req, res) {
    console.log('request in controller creating user method');

    let response = {};
    req.checkBody('firstName', 'firstName should not be null').not().isEmpty();
    req.checkBody('lastName', 'LastName should not be null').not().isEmpty();
    req.checkBody('email', 'Invalid Email').isEmail();
    req.checkBody('email', 'Email should not be empty').not().isEmpty();
    req.checkBody('password', 'Password too short').isLength({ min: 6 });

    const errors = req.validationErrors();
    if (errors) {
      response.status = false;
      response.message = 'Validation Error';
      response.data = errors;
      res.status(500).send(response);
    } else {
      console.log('req ', req.body);
      const userBody = req.body;
      userServiceObj.registerUser(userBody, function (err, data) {
        if (err) {
          response.status = false;
          response.message = 'Email Already Exists';
          res.status(500).send(response);
        } else {
          response.status = true;
          response.message = 'Registered successfully';
          res.status(200).send(response);
        }
      });
    }
  }
  /**
   * login controller method
   */
  login(req, res) {
    let response = {};
    console.log('req ', req.body);
    const userBody = req.body;
    userServiceObj.loginUser(userBody, function (err, result) {
      if (err) {
        response.status = false;
        response.message = err.message;
        res.status(500).send(response);
      } else {
        response.status = true;
        response.message = 'logged in successfully';
        console.log(
          'value of token in controller',
          userServiceObj.returnToken()
        );
        response.token = userServiceObj.returnToken();
        response.senderId = result._id;
        response.result = result.firstName + ' ' + result.lastName;
        res.status(200).send(response);
      }
    });
  }

  /**
   * forgot password controller method
   */
  forgotPassword(req, res) {
    let response = {};

    console.log('req body in forgot password ', req.body);
    const userBody = req.body;
    userServiceObj.forgotPasswordUser(userBody, function (err, result) {
      if (err) {
        response.status = false;
        response.message = err.message;
        res.status(500).send(response);
      } else {
        response.status = true;
        response.message = 'email sent check inbox to reset password';
        res.status(200).send(response);
      }
    });
  }
  /**
   * reset password controller method
   */
  resetPassword(req, res) {
    let response = {};
    console.log('req body in reset password controller', req.body);
    req.checkBody('password', 'Password too short').isLength({ min: 6 });

    const errors = req.validationErrors();
    if (errors) {
      response.status = false;
      response.message = 'Validation Error';
      response.data = errors;
      res.status(500).send(response);
    } else {
      console.log('value of  req.body in resetPassword controller', req.body);
      console.log(
        'value of  req.decoded in resetPassword controller',
        req.decoded
      );
      const userNewPass = { password: req.body.password };
      const userId = { _id: req.body.userId };
      userServiceObj.resetPasswordUser(
        userNewPass,
        userId,
        function (err, result) {
          if (err) {
            response.status = false;
            response.message = 'not able to reset password';
            res.status(500).send(response);
          } else {
            response.status = true;
            response.message = 'password reset Succesful';
            res.status(200).send(response);
          }
        }
      );
    }
  }
}

module.exports = new UserController();
