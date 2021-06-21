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
router.get('/notes/getNotes', verify.tokenVerifyer, notes.getAllUserNotes);
router.post('/notes/updateNote', verify.tokenVerifyer, notes.updateNote);
router.post('/notes/deleteNote', verify.tokenVerifyer, notes.deleteNote);
module.exports = router;
