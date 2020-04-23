const express = require('express');

const { getUsers, signUp, signIn } = require('../api/users');
const { signUpValidationMiddleware } = require('../middlewares/validation');
const fileUploadMiddleware = require('../middlewares/fileUpload');

const router = express.Router();

router.get('/', getUsers);
router.post(
	'/sign-up',
	fileUploadMiddleware.single('image'),
	signUpValidationMiddleware,
	signUp
);
router.post('/sign-in', signIn);

module.exports = router;
