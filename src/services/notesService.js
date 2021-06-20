const noteModelObj = require('../models/notesModel');
let tok;

class NotesService {

	//register service
	addNote(body, callback) {
		console.log(' request in create service ');
		let noteData = { message: body.message, type: body.type, userId: body.userId };
		noteModelObj.addNote(noteData, (err, result) => {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	}
	// // login service
	// loginUser(body, callback) {
	// 	console.log(' request in login service ');
	// 	let mail = { email: body.email };

	// 	userModelObj.findUser(mail, (err, result) => {
	// 		if (err) {
	// 			callback(err);
	// 		} else {
	// 			if (!result) {
	// 				callback({ message: 'no data found' });
	// 			} else {
	// 				console.log('value of result', result);
	// 				console.log('value of result id', result._id);
	// 				console.log('value of body', body.password);
	// 				console.log(
	// 					'after bcrypt reconversion',
	// 					bcrypt.compareSync(body.password, result.password)
	// 				);

	// 				if (bcrypt.compareSync(body.password, result.password)) {
	// 					console.log('value of body in if', body);
	// 					console.log('value of result in if', result);

	// 					let tokenvalue = token.tokenGenerator(result);
	// 					tok = tokenvalue;
	// 					console.log('token generated:  ', tokenvalue);
	// 					callback(null, result);
	// 				} else {
	// 					callback({ message: "passwords don't match" });
	// 				}
	// 			}
	// 		}
	// 	});
	// }
	// /**
	//  * checking user login status
	//  */
	// loggedUser(body, callback) {
	// 	if (body) {
	// 		callback(null, body);
	// 	} else {
	// 		callback(err);
	// 	}
	// }
	// /**
	//  * forgot password service method
	//  */
	// forgotPasswordUser(body, callback) {
	// 	console.log('request in forgot password service ');
	// 	userModelObj.findUser(body, (err, result) => {
	// 		if (err) {
	// 			callback(err);
	// 		} else {
	// 			if (!result) {
	// 				console.log('result:', result);
	// 				callback({ message: "user doesn't exist please register first" });
	// 			} else {
	// 				console.log('value of result', result);
	// 				console.log('value of body', body);
	// 				userModelObj.verifyUser(result, (error, data) => {
	// 					if (error) {
	// 						callback(error);
	// 					} else {
	// 						console.log('data recieved after verify user', data);

	// 						callback(null, data);
	// 					}
	// 				});
	// 			}
	// 		}
	// 	});
	// }
	// /**
	//  * forgot password service method
	//  */
	// resetPasswordUser(userNewPass, userId, callback) {
	// 	// var uId = { '_id': id };
	// 	console.log(
	// 		' request in resetPasswordUser service\n value of password ' +
	// 		userNewPass +
	// 		'\nvalue of id ' +
	// 		userId
	// 	);
	// 	userModelObj.findUser(userId, (err, result) => {
	// 		if (err) {
	// 			console.log('caught in error finding user');

	// 			callback(err);
	// 		} else {
	// 			if (!result) {
	// 				callback({ message: "user doesn't exist please register first" });
	// 			} else {
	// 				console.log('value of result', result);
	// 				console.log('value of id', userId);
	// 				userModelObj.changePassword(userNewPass, userId, (error, data) => {
	// 					if (error) {
	// 						callback(error);
	// 					} else {
	// 						callback(null, data);
	// 					}
	// 				});
	// 			}
	// 		}
	// 	});
	// }
	// /**
	//  * getting all users in chatDashboard
	//  */
	// getAll_Users(body, callback) {
	// 	console.log(' request in getallusers service and has body', body);

	// 	userModelObj.getAll((err, result) => {
	// 		if (err) {
	// 			callback(err);
	// 		} else {
	// 			if (!result) {
	// 				callback({ message: 'no data found' });
	// 			} else {
	// 				callback(null, result);
	// 			}
	// 		}
	// 	});
	// }
	// /**
	//  * saving messages in db
	//  */
	// saveConversation(body, callback) {
	// 	console.log(' request in saveConversation service and has body', body);

	// 	userModelObj.saveMsg((err, result) => {
	// 		if (err) {
	// 			callback(err);
	// 		} else {
	// 			if (!result) {
	// 				callback({ message: 'no data found' });
	// 			} else {
	// 				callback(null, result);
	// 			}
	// 		}
	// 	});
	// }
}
module.exports = new NotesService();
