const jwt = require('jsonwebtoken');

const HttpError = require('../errors/httpError');

const authMiddleware = (req, res, next) => {
	try {
		const { token } = req.cookies;
		if (token) {
			const { userId } = jwt.verify(token, process.env.SECRET);
			req.userId = userId;
		}

		next();
	} catch (err) {
		next(err);
	}
};

const protectRouteMiddleware = (req, res, next) => {
	try {
		if (!req.userId) {
			throw new HttpError('Not authenticated.', 401);
		}
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = { authMiddleware, protectRouteMiddleware };
