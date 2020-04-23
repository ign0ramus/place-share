const fs = require('fs');

const errorMiddleware = (error, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			console.error('File deleting error:', err);
		});
	}
	console.error(error);

	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ error: error.message || 'An error occured. Try again later.' });
};

module.exports = errorMiddleware;
