const express = require('express');

const connectToMongoose = require('./db/connectToMongoose');
const placesRoutes = require('./routes/places');
const userRoutes = require('./routes/users');
const notFoundRoute = require('./routes/notFound');
const errorMiddleware = require('./middlewares/error');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes);
app.use(notFoundRoute);
app.use(errorMiddleware);

const run = async () => {
	try {
		await connectToMongoose();

		app.listen(PORT, () => {
			console.log(`App is running on port ${PORT}`);
		});
	} catch (err) {
		console.error(err);
	}
};

run();
