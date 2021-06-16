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
  //create and save messages
  saveMsg(body, callback) {
    console.log(' request in model save msg', body);
    const newConversation = new messages({
      senderId: body.senderId,
      receiverId: body.receiverId,
      sender: body.sender,
      receiver: body.receiver,
      message: body.message
    });

    newConversation.save((err, res) => {
      if (err) {
        callback(err);
      } else {
        callback(null, res);
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
    // this.findUser(body, (error, data) => {
    // 	if (error) {
    // 		callback(error);
    // 	} else {
    console.log('value of data._id', body._id);
    let tokenvalue = token.tokenGenerator(body);
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
    // 	}
    // });
  }
  // change user password using reset method from service
  changePassword(body, id, callback) {
    console.log('request in change password model method and id is:=>', id);
    console.log(
      'request in change password model method and body.password is :>',
      body.password
    );

    const qpassword = utility.encryptPass(body.password);
    console.log(
      'password to be hashed' + body.password + '\npassword after hashing',
      qpassword
    );
    users.findByIdAndUpdate(id, { password: qpassword }, (err, data) => {
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
