var User  = require("../models/User");
// import User from "../models/User";


export default class UserAPIController{
	static login = (formData, callback) => {
		User.findOne({
			email: formData.email ,
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
	};

	static create = (formData, callback) => {
		console.log("Form data creation...")
		console.log(JSON.stringify(formData))
		if(formData.email && formData.password){
			const {	day, month, year, username, password, first_name, last_name, email } = formData;
			let dob = `${year}-${month}-${day}`;
			console.log(dob)
			dob = new Date(dob);
			console.log(dob)
			console.log("Date is above")
			User.create({
				username,password, email,
				first_name, last_name, dob
			}, (err, user) => {
				console.log(JSON.stringify(err));
				console.log("Create data...");
				if(!err){
					callback({
						user,
						success: true
					});
				}else(
					callback({
						success: false
					})
				)
			})
		}
	};

	static get = () => {

	}

}


// var UserAPIController = {
// 	login: function(formData){
//
// 	}
// }

module.exports = UserAPIController;