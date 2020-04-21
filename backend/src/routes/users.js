const express = require('express');

const { getUsers, signUp, signIn } = require('../api/users');
const { signUpValidationMiddleware } = require('../middlewares/validation');

const router = express.Router();

router.get('/', getUsers);
router.post('/sign-up', signUpValidationMiddleware, signUp);
router.post('/sign-in', signIn);

module.exports = router;
