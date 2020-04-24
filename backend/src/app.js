const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectToMongoose = require('./db/connectToMongoose');
const placesRoutes = require('./routes/places');
const userRoutes = require('./routes/users');
const { authMiddleware } = require('./middlewares/auth');
const notFoundRoute = require('./routes/notFound');
const errorMiddleware = require('./middlewares/error');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use(authMiddleware);

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
