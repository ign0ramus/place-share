const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const UserModel = require('../db/models/user');

const saltRounds = 10;

const getUsers = async (req, res, next) => {
	try {
		const users = await UserModel.aggregate().sample(10).exec();
		res.json({ result: users, error: null });
	} catch (err) {
		next(err);
	}
};

const signUp = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		const errors = validationResult(req).formatWith(({ msg }) => msg);

		if (!errors.isEmpty()) {
			res.status(422);
			return res.json({ result: null, error: errors.mapped() });
		}

		const hash = await bcrypt.hash(password, saltRounds);
		const user = await UserModel.create({
			name,
			email,
			password: hash,
			// TODO: image
		});
		res.json({ result: user.toDTO(), error: null });
	} catch (err) {
		next(err);
	}
};

const signIn = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });
		const isEqual = user && (await bcrypt.compare(password, user.password));

		if (!isEqual) {
			return res.json({ result: null, error: 'Invalid email or password.' });
		}

		res.json({ result: user.toDTO(), error: null });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getUsers,
	signUp,
	signIn,
};
