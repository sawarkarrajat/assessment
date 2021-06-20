const notesServiceObj = require("../services/notesService");

class NotesController {
	/**
	 * create user controller method
	 */
	addNote(req, res) {
		console.log('request in controller addNote');

		let response = {};
		req.checkBody('message', 'message should not be null').not().isEmpty();

		const errors = req.validationErrors();
		if (errors) {
			response.status = false;
			response.message = 'Validation Error';
			response.data = errors;
			res.status(500).send(response);
		} else {
			console.log('req ', req.body);
			const noteBody = req.body;
			notesServiceObj.addNote(noteBody, function (err, data) {
				if (err) {
					response.status = false;
					response.message = 'unable to add note';
					res.status(500).send(response);
				} else {
					response.status = true;
					response.message = 'note added successfully';
					response.content = data;
					res.status(200).send(response);
				}
			});
		}
	}
}

module.exports = new NotesController();
