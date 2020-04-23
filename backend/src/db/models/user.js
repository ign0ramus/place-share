const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		index: true,
		unique: true,
	},
	image: String,
	password: {
		type: String,
		required: true,
	},
});

userSchema.methods.toDTO = function () {
	return {
		_id: this._id,
		name: this.name,
		email: this.email,
		image: this.image,
	};
};

module.exports = mongoose.model('User', userSchema);
