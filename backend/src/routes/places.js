const express = require('express');

const fileUploadMiddleware = require('../middlewares/fileUpload');

const {
	getPlace,
	getUserPlaces,
	createNewPlace,
	editPlace,
	deletePlace,
} = require('../api/places');
const {
	createNewPlaceValidationMiddleware,
	editPlaceValidationMiddleware,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/:placeId', getPlace);
router.get('/user/:userId', getUserPlaces);
router.post(
	'/',
	fileUploadMiddleware.single('image'),
	createNewPlaceValidationMiddleware,
	createNewPlace
);
router.patch('/:placeId', editPlaceValidationMiddleware, editPlace);
router.delete('/:placeId', deletePlace);

module.exports = router;
