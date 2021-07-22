const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const utility = require('../utilities/utility');
const token = require('../utilities/tokenGen');
const nodemailer = require('../utilities/nodemailer.js');
const { host, port } = require('../configs/server.config');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true
    },
    lastName: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const users = mongoose.model('users', userSchema);

class UserModel {
  findUser(body, callback) {
    users.findOne(body, (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  }
  getAll(callback) {
    users.find({}, (err, usersinfo) => {
      if (err) {
        callback(err);
      } else {
        callback(null, usersinfo);
      }
    });
  }

  //Create and Save a new User
  createUser(body, callback) {
    console.log(' request in model', body);
    body.password = utility.encryptPass(body.password);
    console.log('hashed password is ', body.password);
    const createUserDb = new users({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password
    });

    createUserDb.save((err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
      }
    });
  }
  //method to verify user for forgot password
  verifyUser(body, callback) {
    console.log(' request in verifyUSer model', body);
    console.log('value of data._id', body._id);
    let tokenvalue = token.tokenGenerator(body._id);
    console.log('tokenvalue after token generation', tokenvalue);
    let address = `http://${host}:${port}/users/resetPassword/${tokenvalue}`;
    nodemailer.mailer(body, address, (err, res) => {
      if (err) {
        callback(err);
      } else {
        console.log('data in model in verifyUser', res);
        callback(null, res);
      }
    });
  }
  // change user password using reset method from service
  changePassword(body, id, callback) {
    console.log('request in change password model method and id is:=>', id);
    console.log(
      'request in change password model method and body.password is :>',
      body.password
    );

    const newPassword = { password: utility.encryptPass(body.password) };

    console.log(
      'password to be hashed' + body.password + '\npassword after hashing',
      newPassword
    );

    users.findByIdAndUpdate(id, newPassword, (err, data) => {
      if (err) {
        console.log('error finding id in changepassword method in model');
        callback(err);
      } else {
        console.log('password updated succesfully', data);
        callback(null, data);
      }
    });
  }
}

module.exports = new UserModel();
