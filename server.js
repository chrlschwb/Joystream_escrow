require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const profile = require('./server/routes/api/profile');

const db = require('./server/config/keys.js').mongoURI;

const mongoOption = {
	socketTimeoutMS: 60000,
	keepAlive: true,
	reconnectTries: 60000
};
mongoose.connect(db, mongoOption).then(() => console.log('MongoDB Connected')).catch((err) => console.log(err));

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(bodyParser.json());

app.use('/api/profile', profile);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
