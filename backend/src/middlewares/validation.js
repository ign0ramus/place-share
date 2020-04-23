const { check } = require('express-validator');
const UserModel = require('../db/models/user');

const createNewPlaceValidationMiddleware = [
	check('title', 'Title is required.').not().isEmpty(),
	check('title', 'Title should be alphanumeric.').isString(),
	check('title', 'Title maximum length is 100 characters.').isLength({
		max: 100,
	}),
	check('description', 'Description minimum length is 5 characters.').isLength({
		min: 5,
	}),
	check('address', 'Address is required.').not().isEmpty(),
	check('address', 'Title maximum length is 300 characters.').isLength({
		max: 300,
	}),
];

const editPlaceValidationMiddleware = [
	check('title', 'Title is required.').not().isEmpty(),
	check('title', 'Title should be alphanumeric.').isString(),
	check('title', 'Title maximum length is 100 characters.').isLength({
		max: 100,
	}),
	check('description', 'Description minimum length is 5 characters.').isLength({
		min: 5,
	}),
];

const signUpValidationMiddleware = [
	check('name', 'Name is required.').not().isEmpty(),
	check('name', 'Name should be alphanumeric.').isString(),
	check('name', 'name maximum length is 100 characters.').isLength({
		max: 100,
	}),
	check('email', 'Email is not valid.').normalizeEmail().isEmail(),
	check('email', 'Email already exists').custom(async (email) => {
		const user = await UserModel.findOne({ email });

		if (user) {
			throw Error('Email already exists');
		}
	}),
	check('password', 'Password minimum length is 6 characters.').isLength({
		min: 6,
	}),
];

module.exports = {
	createNewPlaceValidationMiddleware,
	editPlaceValidationMiddleware,
	signUpValidationMiddleware,
};
