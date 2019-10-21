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
		type: String
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	gender: String,
	more_details: String,
	address: String,
	nationality: String,
	roles: Array,
	dob: Date,
	mobile_no: String,
	qid_no: String,
	photo: String,
	qid: String,
	last_active: Date,
	created_at: Date,	
	updated_at: Date,
	admin: Boolean,
	super_admin: Boolean,
	token: String,
	active: Boolean
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
// export default User