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
}

module.exports = new NotesModel();
