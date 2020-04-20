const express = require('express');

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

router.post('/', (req, res, next) => {
	const { title, description, coordinates, address, creator } = req.body;

	const place = {
		title,
		description,
		location: coordinates,
		address,
		creator,
	};
	res.json(place);
});

router.patch('/:placeId', (req, res, next) => {});

router.delete('/:placeId', (req, res, next) => {});

module.exports = router;
