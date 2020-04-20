const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
	console.log('GET');
	res.json();
});

router.post('/sign-up', (req, res, next) => {

});

router.post('/sign-in', (req, res, next) => {
    
})

module.exports = router;
s