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

	static update = (formData, callback) => {
		formData = omit(formData, "email", "username", "password", "_id", "_v");
		formData["updated_at"] = new Date();
		formData["last_active"] = new Date();
		User.updateOne({_id: formData._id}, formData, (err, write) => {
			if(!err){
				callback({
					success: true,
					user: formData
				})
			}else{
				callback({
					success: false
				})
			}
		})
	}

}


// var UserAPIController = {
// 	login: function(formData){
//
// 	}
// }

module.exports = UserAPIController;