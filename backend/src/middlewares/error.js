const errorMiddleware = (error, req, res, next) => {
	console.error(error);

	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ error: error.message || 'An error occured. Try again later.' });
};

module.exports = errorMiddleware;
