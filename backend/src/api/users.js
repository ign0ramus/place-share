const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');

const UserModel = require('../db/models/user');

const saltRounds = 10;

const setCookieToken = (res, token) => {
	res.cookie('token', token, {
		maxAge: 259200000,
		httpOnly: true,
		secure: process.env.NODE_ENV !== 'development',
	});
};

const getUsers = async (req, res, next) => {
	try {
		const { userId } = req;
		const users = await UserModel.aggregate()
			.match({ _id: { $ne: ObjectId(userId) } })
			.sample(10)
			.exec();

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
			image: req.file ? req.file.path : '',
		});

		const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
			expiresIn: '3d',
		});

		setCookieToken(res, token);

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

		const token = jwt.sign({ userId: user.id }, process.env.SECRET, {
			expiresIn: '3d',
		});

		setCookieToken(res, token);
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
