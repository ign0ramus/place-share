const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

router.get('/', (req, res, next) => {
	console.log('GET');
	res.json();
});

router.post(
	'/sign-up',
	[
		check('name').not().isEmpty(),
		check('email').normalizeEmail().isEmail(),
		check('password').isLength({ min: 6 }),
	],
	(req, res, next) => {
		const errors = validationResult(req);
	}
);

router.post('/sign-in', (req, res, next) => {});

module.exports = router;
