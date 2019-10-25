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
	qid: Object,
	last_active: Date,
	created_at: Date,	
	updated_at: Date,
	admin: Boolean,
	super_admin: Boolean,
	token: String,
	active: Boolean
});

/**
 * @description Run before item deleted from database,
 * this feature can be use to delete other collections related to deleted user
 */
UserSchema.pre("remove", function(next){ // `this` is deleted user
	console.log(this._id);
	console.log(`Deleted user is '${this.email}'`);
	next();
});

/**
 * @description Run after item deleted from database,
 * this callback is use to perform any actions ( not database)
 */
UserSchema.post("remove", function(next){
	console.log("Run after user deleted.")
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
// export default User