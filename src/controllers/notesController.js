const notesServiceObj = require("../services/notesService");

class NotesController {

	addNote(req, res) {
		console.log('request in controller addNote', req.body.userId);

		let response = {};
		req.checkBody('message', 'message should not be null').not().isEmpty();
		req.checkBody('userId', 'userId should not be null').not().isEmpty();

		const errors = req.validationErrors();
		if (errors) {
			response.status = false;
			response.message = 'Validation Error';
			response.data = errors;
			res.status(400).send(response);
		} else {
			console.log('req ', req.body);
			const noteBody = req.body;
			notesServiceObj.addNote(noteBody, (err, data) => {
				if (err) {
					response.status = false;
					response.message = 'unable to add note';
					res.status(404).send(response);
				} else {
					response.status = true;
					response.message = 'note added successfully';
					response.content = data;
					res.status(200).send(response);
				}
			});
		}
	}

	updateNote(req, res) {
		console.log('request in updateNote controller');

		let response = {};
		req.checkBody('id', 'id should not be null').not().isEmpty();

		const errors = req.validationErrors();
		if (errors) {
			response.status = false;
			response.message = 'Validation Error';
			response.data = errors;
			res.status(400).send(response);
		} else {
			console.log('req ', req.body);
			const reqBody = req.body;
			notesServiceObj.updateNote(reqBody, (err, data) => {
				if (err) {
					response.status = false;
					response.message = 'unable to update note';
					res.status(404).send(response);
				} else {
					response.status = true;
					response.message = 'note updated successfully';
					response.content = data;
					res.status(200).send(response);
				}
			});
		}
	}
	deleteNote(req, res) {
		console.log('request in controller deletenote');

		let response = {};
		req.checkBody('id', 'note id should not be null').not().isEmpty();

		const errors = req.validationErrors();
		if (errors) {
			response.status = false;
			response.message = 'Validation Error';
			response.data = errors;
			res.status(400).send(response);
		} else {
			console.log('req ', req.body);
			const reqBody = req.body;
			notesServiceObj.deleteNote(reqBody, (err, data) => {
				if (err) {
					response.status = false;
					response.message = 'unable to delete note';
					res.status(404).send(response);
				} else {
					response.status = true;
					response.message = 'note deleted successfully';
					response.content = data;
					res.status(200).send(response);
				}
			});
		}
	}

	getAllUserNotes(req, res) {
		console.log('request in controller addNote');

		let response = {};
		req.checkBody('userId', 'message should not be null').not().isEmpty();

		const errors = req.validationErrors();
		if (errors) {
			response.status = false;
			response.message = 'Validation Error';
			response.data = errors;
			res.status(400).send(response);
		} else {
			console.log('req ', req.body);
			const reqBody = req.body;
			notesServiceObj.getAllUserNotes(reqBody, (err, data) => {
				if (err) {
					response.status = false;
					response.message = 'unable to find notes';
					res.status(404).send(response);
				} else {
					response.status = true;
					response.message = 'notes found successfully';
					response.content = data;
					res.status(200).send(response);
				}
			});
		}
	}
}

module.exports = new NotesController();
