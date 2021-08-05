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
/**
 * a class representing notes model
 */
class NotesModel {
	/**
	 * method to add notes
	 * @param {Body} noteData - noteData body
	 * @param {callback} callback - callback method
	 */
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
	/**
	 * method to update notes
	 * @param {string} id - id string
	 * @param {Body} noteData - noteData body
	 * @param {callback} callback - callback method
	 */
	updateNote(id, noteData, callback) {
		let noteId = { _id: mongoose.Types.ObjectId(id) };
		console.log(' request in add note model', noteData);

		notes.findByIdAndUpdate(noteId, noteData, (err, data) => {
			if (err || !data) {
				console.log('error finding note', err);
				callback(err || 'error finding note');
			}
			if (data) {
				console.log('note updated succesfully', data);
				callback(null, data);
			}
		});
	}
	/**
	 * method to delete notes
	 * @param {string} id - id string
	 * @param {callback} callback - callback method
	 */
	deleteNote(id, callback) {
		let noteId = { _id: mongoose.Types.ObjectId(id) };
		console.log(' request in delete note model', typeof noteId);

		notes.findByIdAndDelete(noteId, (err, data) => {
			if (err || !data) {
				console.log('error finding note', err);
				callback(err || 'error finding note');
			}
			if (data) {
				console.log('note deleted succesfully', data);
				callback(null, data);
			}
		});
	}
	/**
	 * method to get all notes
	 * @param {string} userId - userId string
	 * @param {callback} callback - callback method
	 */
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
}

module.exports = new NotesModel();
