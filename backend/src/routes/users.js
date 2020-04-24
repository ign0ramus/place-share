const express = require('express');

const {
	getUsers,
	signUp,
	signIn,
	checkUser,
	signOut,
} = require('../api/users');
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
router.post('/check-user', checkUser);
router.post('/sign-out', signOut);

module.exports = router;
