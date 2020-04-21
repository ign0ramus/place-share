const HttpError = require('../errors/httpError');

const notFoundRoute = (req, res, next) => {
	next(new HttpError('Not Found', 404));
};

module.exports = notFoundRoute;
