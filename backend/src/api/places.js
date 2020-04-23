const { validationResult } = require('express-validator');
const fs = require('fs');

const PlaceModel = require('../db/models/place');
const { getCoordsForAddress } = require('../utils/location');
const HttpError = require('../errors/httpError');

const getPlace = async (req, res, next) => {
	try {
		const { placeId } = req.params;
		const place = await PlaceModel.findById(placeId);

		if (!place) {
			throw new HttpError('Not Found', 404);
		}

		res.json({ result: place, error: null });
	} catch (err) {
		next(err);
	}
};

const getUserPlaces = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const places = await PlaceModel.find({ creator: userId });

		res.json({ result: places, error: null });
	} catch (err) {
		next(err);
	}
};

const createNewPlace = async (req, res, next) => {
	try {
		const { title, description, address } = req.body;
		const errors = validationResult(req).formatWith(({ msg }) => msg);

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
			creator: '5e9f1d0ca9f9de4f540e8d1a',
			image: req.file ? req.file.path : '',
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

		const errors = validationResult(req).formatWith(({ msg }) => msg);

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
			throw new HttpError('Not Found', 404);
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
			throw new HttpError('Not Found', 404);
		}
		const imagePath = place.image;
		await place.deleteOne();
		fs.unlink(imagePath, (err) => {
			console.error(err);
		});

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
