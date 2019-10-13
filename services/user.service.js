const User = require("../models/User")
// import User from "../models/User";


exports.getUserByID = async (id) => {
	let user = {};
	try{
		user = User.find({__id: id});
	}catch(e){

	}
	return user;
}