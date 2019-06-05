const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	slug: {
		type: String,
		unique: true
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
	isActive: {
		type: Boolean
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
	password: {
		type: String,
		required: true
		// select: false
	},
});

module.exports = mongoose.model('User', userSchema);
