const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	address: {
		type: String
	},
	detail: {
		type: String
	},
	walletAddress: {
		type: String
	},
	job: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
