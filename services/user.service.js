import User from "../models/User";


export const getUserByID = async (id) => {
	let user = {};
	try{
		user = User.find({__id: id});
	}catch(e){

	}
	return user;
}