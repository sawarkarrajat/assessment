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

	updateNote(body, callback) {
		console.log(' request in updateNote service ', body);
		const id = body.id;
		let noteData = { message: body.message, type: body.type };
		noteModelObj.updateNote(id, noteData, (err, result) => {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	}
	deleteNote(body, callback) {
		console.log(' request in updateNote service ', body);
		const id = body.id;
		noteModelObj.deleteNote(id, (err, result) => {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	}

	getAllUserNotes(body, callback) {
		console.log(' request in getAllUserNotes service ', body.userId);

		noteModelObj.getAllUserNotes(body.userId, (err, result) => {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	}

}
module.exports = new NotesService();
