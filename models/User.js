const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true 
	},
	first_name: String,
	last_name: String,
	username: {
		type: String,
		unique: true,
		required: true 
	},
	password: {
		type: String,
		required: true 
	},
	address: String,
	country: String,
	roles: Array,
	dob: Date,	
	image: String, 
	last_active: Date,
	created_at: Date,	
	updated_at: Date   
});

const User = module.exports =mongoose.model('User', UserSchema);