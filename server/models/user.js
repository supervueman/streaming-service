const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	phone: {
		type: String
	},
	website: {
		type: String
	},
	facebook: {
		type: String
	},
	instagram: {
		type: String
	},
	vkontakte: {
		type: String
	},
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	content: {
		type: String
	},
	avatar: {
		type: String
	},
	subscribers: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	subscriptions: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'Product'
	}],
	stream: {
		type: Schema.Types.ObjectId,
		ref: 'Stream'
	},
	password: {
		type: String,
		required: true
		// select: false
	},
});

module.exports = mongoose.model('User', userSchema);
