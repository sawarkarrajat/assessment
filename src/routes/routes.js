const express = require('express');
const users = require('../controllers/userController');
const notes = require('../controllers/notesController');
const verify = require('../utilities/tokenVerify');
let router = express.Router();
//Create ne user
console.log('in router');

router.post('/users/register', users.create);
router.post('/users/login', users.login);
router.post('/users/forgotPassword', users.forgotPassword);
router.post('/users/resetPassword', verify.tokenVerifyer, users.resetPassword);
router.post('/notes/add', verify.tokenVerifyer, notes.addNote);
// router.post('/notes/update', verify.tokenVerifyer, users.resetPassword);
// router.post('/notes/delete', verify.tokenVerifyer, users.resetPassword);
module.exports = router;
