const express = require('express');
const users = require('../controllers/userController');
const verify = require('../utilities/tokenVerify');
let router = express.Router();
//Create ne user
console.log('in router');

router.post('/users/register', users.create);
router.post('/users/login', users.login);
router.post('/users/forgotPassword', users.forgotPassword);
router.post('/users/resetPassword', verify.tokenVerifyer, users.resetPassword);
module.exports = router;
