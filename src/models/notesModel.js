const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema(
	{
		message: {
			type: String,
			trim: true,
			required: true
		},
		type: {
			type: String,
			trim: true,
			required: true
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'users'
		}
	},
	{
		timestamps: true
	}
);

const notes = mongoose.model('notes', noteSchema);

class NotesModel {
	addNote(noteData, callback) {
		console.log(' request in add note model', noteData);
		const notesDb = new notes({
			message: noteData.message,
			type: noteData.type,
			userId: noteData.userId
		});

		notesDb.save((err, res) => {
			if (err) {
				console.log('err:', err);
				callback(err);
			} else {
				console.log('res in after save:', res);
				callback(null, res);
			}
		});
	}

	updateNote(id, noteData, callback) {
		id = mongoose.Types.ObjectId(id);
		console.log(' request in add note model', noteData);

		notes.findByIdAndUpdate(id, noteData, (err, data) => {
			if (err) {
				console.log('error finding id model');
				callback(err);
			} else {
				console.log('note updated succesfully', data);
				callback(null, data);
			}
		});
	}

	deleteNote(id, callback) {
		id = mongoose.Types.ObjectId(id);
		console.log(' request in delete note model', id);

		notes.findByIdAndDelete(id, (err, data) => {
			if (err) {
				console.log('error finding id model');
				callback(err);
			} else {
				console.log('note deleted succesfully', data);
				callback(null, data);
			}
		});
	}

	getAllUserNotes(userId, callback) {
		userId = mongoose.Types.ObjectId(userId);
		console.log('userId:', userId);
		notes.find({ userId: userId }, (err, result) => {
			if (err) {
				console.log('err:', err);
				callback(err);
			} else {
				console.log('result:', result);
				callback(null, result);
			}
		});
	}
	// //create and save messages
	// saveMsg(body, callback) {
	// 	console.log(' request in model save msg', body);
	// 	const newConversation = new messages({
	// 		senderId: body.senderId,
	// 		receiverId: body.receiverId,
	// 		sender: body.sender,
	// 		receiver: body.receiver,
	// 		message: body.message
	// 	});

	// 	newConversation.save((err, res) => {
	// 		if (err) {
	// 			callback(err);
	// 		} else {
	// 			callback(null, res);
	// 		}
	// 	});
	// }
	// //Create and Save a new User
	// createUser(body, callback) {
	// 	console.log(' request in model', body);
	// 	body.password = utility.encryptPass(body.password);
	// 	console.log('hashed password is ', body.password);
	// 	const createUserDb = new users({
	// 		firstName: body.firstName,
	// 		lastName: body.lastName,
	// 		email: body.email,
	// 		password: body.password
	// 	});

	// 	createUserDb.save((err, res) => {
	// 		if (err) {
	// 			callback(err);
	// 		} else {
	// 			callback(null, res);
	// 		}
	// 	});
	// }
	// //method to verify user for forgot password
	// verifyUser(body, callback) {
	// 	console.log(' request in verifyUSer model', body);
	// 	// this.findUser(body, (error, data) => {
	// 	// 	if (error) {
	// 	// 		callback(error);
	// 	// 	} else {
	// 	console.log('value of data._id', body._id);
	// 	let tokenvalue = token.tokenGenerator(body);
	// 	console.log('tokenvalue after token generation', tokenvalue);
	// 	let address = `http://${host}:${port}/users/resetPassword/${tokenvalue}`;
	// 	nodemailer.mailer(body, address, (err, res) => {
	// 		if (err) {
	// 			callback(err);
	// 		} else {
	// 			console.log('data in model in verifyUser', res);
	// 			callback(null, res);
	// 		}
	// 	});
	// 	// 	}
	// 	// });
	// }
	// // change user password using reset method from service
	// changePassword(body, id, callback) {
	// 	console.log('request in change password model method and id is:=>', id);
	// 	console.log(
	// 		'request in change password model method and body.password is :>',
	// 		body.password
	// 	);

	// 	const qpassword = utility.encryptPass(body.password);
	// 	console.log(
	// 		'password to be hashed' + body.password + '\npassword after hashing',
	// 		qpassword
	// 	);
	// 	users.findByIdAndUpdate(id, { password: qpassword }, (err, data) => {
	// 		if (err) {
	// 			console.log('error finding id in changepassword method in model');
	// 			callback(err);
	// 		} else {
	// 			console.log('password updated succesfully', data);
	// 			callback(null, data);
	// 		}
	// 	});
	// }
}

module.exports = new NotesModel();
