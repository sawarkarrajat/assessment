const noteModelObj = require('../models/notesModel');
let tok;
/**
 * A class representing Note and its operations
 */
class NotesService {

	/**
	 * Add note method
	 * @param {Body} body - the body object
	 * @param {callback} callback - the callback method for further operations
	 */
	addNote(body, callback) {
		console.log(' request in create service ', body);
		let noteData = { message: body.message, type: body.type, userId: body.userId };
		noteModelObj.addNote(noteData, (err, result) => {
			if (err) {
				callback(err);
			} else {
				callback(null, result);
			}
		});
	}

	/**
 * update note method
 * @param {Body} body - the body object
 * @param {callback} callback - the callback method for further operations
 */
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

	/**
 * delete note method
 * @param {Body} body - the body object
 * @param {callback} callback - the callback method for further operations
 */
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

	/**
	 * get all notes method
	 * @param {Body} body - the body object
	 * @param {callback} callback - the callback method for further operations
	 */
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
