const User = require("../models/User");
const getUserByID = require("../services/user.service").getUserByID;

// import User from "../models/User";
// import {	getUserByID	} from "../services/user.service";

// export class UserController {
//
// 	static create = (formData, callback) => {
// 		console.log("Create section....")
// 		try{
// 			User.create(formData, function(err, data){
// 				callback(err, data)
// 			})
// 		}catch (e) {
// 			console.log("User create error.");
// 			console.log(e)
// 		}
//
// 	}
// }

const UserController = {
	create:(formData, callback) => {
		console.log("Create section....")
		try{
			User.create(formData, function(err, data){
				callback(err, data)
			})
		}catch (e) {
			console.log("User create error.");
			console.log(e)
		}
	}
}

module.exports = UserController;



