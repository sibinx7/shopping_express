var User  = require("../models/User");
// import User from "../models/User";


export default class UserAPIController{


	static login = (formData, callback) => {
		console.log("Reached here User api controller")
		console.log(JSON.stringify(formData));
		User.findOne({
			username: formData.username,
			password: formData.password
		}, (err, user) => {
			if(!err){
				callback({
					user,
					success: true,
					logged: true
				})
			}else{
				callback({
					success: false,
					logged: false
				})
			}
		});
	}

	static get = () => {

	}

}


// var UserAPIController = {
// 	login: function(formData){
//
// 	}
// }

module.exports = UserAPIController;