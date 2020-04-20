const express = require('express');

const placesRoutes = require('./routes/places');
const userRoutes = require('./routes/users');

const app = express();

app.use(express.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);

app.use((req, res, next) => {
	//TODO: 404 route error (custom 404 page on frontend)
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unkown error occured!' });
});

app.listen(5000);
