const express = require('express');
const { check, validationResult } = require('express-validator');
const { getCoordsForAddress } = require('../util/localtion');

const router = express.Router();

router.get('/:placeId', (req, res, next) => {
	const { placeId } = req.params;
	const place = {
		id: placeId,
		title: 'DUMMY',
		purpose: 'MOCK',
	};

	//TODO: error handling

	res.json(place);
});

router.get('/user/:userId', (req, res, next) => {
	const { userId } = req.params;
	const place = {
		id: userId,
		title: 'DUMMY',
		purpose: 'MOCK',
	};

	//TODO: error handling

	res.json(place);
});

router.post(
	'/',
	[
		check('title').not().isEmpty(),
		check('description').isLength({ min: 5 }),
		check('address').not().isEmpty(),
	],
	async (req, res, next) => {
		const { title, description, coordinates, address, creator } = req.body;
		const errors = validationResult(req);
		try {
			const coordinates = await getCoordsForAddress(address);
		} catch (err) {
			return next(err);
		}
		const place = {
			title,
			description,
			location: coordinates,
			address,
			creator,
		};
		res.json(place);
	}
);

router.patch(
	'/:placeId',
	[check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
	(req, res, next) => {
		const errors = validationResult(req);
	}
);

router.delete('/:placeId', (req, res, next) => {});

module.exports = router;
