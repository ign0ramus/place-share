const { validationResult } = require('express-validator');

const PlaceModel = require('../db/models/place');
const { getCoordsForAddress } = require('../utils/location');
const HttpError = require('../errors/httpError');

const getPlace = async (req, res, next) => {
	try {
		const { placeId } = req.params;
		const place = await PlaceModel.findById(placeId);

		if (!place) {
			throw new HttpError(404);
		}

		res.json(place);
	} catch (err) {
		next(err);
	}
};

const getUserPlaces = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const places = await PlaceModel.find({ creator: userId });

		if (!places || !places.length) {
			throw new HttpError(404);
		}

		res.json(place);
	} catch (err) {
		next(err);
	}
};

const createNewPlace = async (req, res, next) => {
	try {
		const { title, description, address, creator } = req.body;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(422);
			return res.json({ result: null, error: errors.mapped() });
		}

		const coordinates = await getCoordsForAddress(address);
		const place = await PlaceModel.create({
			title,
			description,
			location: coordinates,
			address,
			creator,
			image:
				'https://i.insider.com/5a3433814aa6b51c008b55e3?width=1100&format=jpeg&auto=webp',
		});

		res.json({ result: place, error: null });
	} catch (err) {
		return next(err);
	}
};

const editPlace = async (req, res, next) => {
	try {
		const { placeId } = req.params;
		const { title, description } = req.body;

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(422);
			return res.json({ result: null, error: errors.mapped() });
		}

		const place = await PlaceModel.findOneAndUpdate(
			{ _id: placeId },
			{ $set: { title, description } },
			{ new: true }
		);

		if (!place) {
			throw new HttpError(404);
		}

		res.json({ result: place, error: null });
	} catch (err) {
		next(err);
	}
};

const deletePlace = async (req, res, next) => {
	try {
		const { placeId } = req.params;
		const place = await PlaceModel.findById(placeId);

		if (!place) {
			throw new HttpError(404);
		}

		await place.deleteOne();

		res.json({ result: true, error: null });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getPlace,
	getUserPlaces,
	createNewPlace,
	editPlace,
	deletePlace,
};
