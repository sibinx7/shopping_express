import {omit} from "underscore";
var User  = require("../models/User");
import {	Base64 } from "js-base64";
import UserMail from "../helpers/mails/user.mail";
import Project from "../models/Project";
import {checkProjectCompleteness} from "../helpers/projects";
// import User from "../models/User";


export default class UserAPIController{
	static login = (formData, callback) => {
		User.findOne({
			email: formData.email ,
			password: Base64.encode(formData.password),
			active: true
		})
			.populate("-password")
			.exec((err, user) => {
				if(!err){
					// Check whether project complete or not
					if(!user){
						callback({
							success: false,
							user: null,
							error: "User not found with this Email and Password"
						})
					}
					if(user && Array.isArray(user.roles) && user.roles.indexOf("user") > -1){ // Only for Users
						if(user._id){
							Project.findOne({user_id: user._id}, (errProject, projectData) => {
								if(!errProject){
									let user_completeness = false;
									if(projectData.submitted){
										user_completeness = true;
									}
									let project_complete = checkProjectCompleteness(projectData);
									if(project_complete.submitted){
										user_completeness = true;
									}
									if(user_completeness){
										if(user.completed_projects.indexOf(projectData._id) === -1){
											let completed_projects;
											if(Array.isArray(user.completed_projects) && user.completed_projects.length){
												completed_projects = [...user.completed_projects, projectData._id]
											}else{
												completed_projects = [projectData._id];
											}
											User.updateOne({_id:user._id}, {
												completed_projects:completed_projects
											});
										}
									}
								}
							});
						}
					}
					let responseData = {};
					if(user){
						responseData = {
							user,
							success: true,
							logged: true,
							message: "User logged"
						}
					}else{
						responseData = {
							user,
							success: false,
							logged: false,
							error: "User not exist"
						}
					}
					console.log(JSON.stringify(responseData));
					callback(responseData)
				}else{
					callback({
						success: false,
						logged: false,
						error: err
					})
				}
			})
	};

	static create = (formData, callback) => {
		if(formData.email && formData.password){
			const {	day, month, year, first_name, last_name, email, language, roles, admin, super_admin, jury } = formData;
			let {	password } = formData;
			password = Base64.encode(password);
			let {	username } = formData;
			let dob = `${year}-${month}-${day}`;
			dob = new Date(dob);
			if(!username){
				username = email
			}

			let userFields = {
					username,password, email,
					first_name, last_name, dob,
				};

			try{
				const token = Base64.encode(`${username}:${password}`);
				if(token){
					userFields["token"] = token;
				}
			}catch (e) {

			}

			if(!roles){
				if(!super_admin || !admin || !jury){
					userFields["roles"] = ["user"];
				}
			}

			User.countDocuments({email}, (error, count) => {
				if(!error){
					console.log(count)
					if(!count){
						console.log("Email not exists...")
						User.create( userFields, (err, user) => {
							console.log(JSON.stringify(err))
							if(!err){
								console.log("User successfully created...")
								// Send Email after
								let toMailObject = {
									"Email": user.email
								};
								if(user.first_name){
									toMailObject["Name"] = user.first_name;
									if(user.last_name){
										toMailObject["Name"] += ` ${user.last_name}`
									}
								}
								let toMail = [toMailObject];
								try{
									console.log("Send message")
									UserMail.send_email_sign_up(toMail, [], user, language , () => {
										// callback
									});
								}catch (e) {
									console.log("Mail send error")
									console.log(JSON.stringify(e))
								}
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
					}else{
						console.log("Email exist")
						callback({
							success: false,
							error: `Email address ${email} is already exist`,
							key: "email"
						})
					}
				}
			})


		}
	};

	static get = (_id, callback) => {
		User.findOne({_id})
			.populate("-password")
			.exec((err, user) => {
				if(!err){
					callback({
						success: true,
						user
					})
				}else{
					callback({
						success: false
					})
				}
			})
	}

	static update = (formData, callback) => {
		console.log(JSON.stringify(formData))
		const _id = formData._id;
		formData = omit(formData, "email", "username", "password", "_id", "_v");
		formData["updated_at"] = new Date();
		formData["last_active"] = new Date();
		formData["active"] = true;
		User.updateOne({_id}, formData, (err, write) => {
			console.log(JSON.stringify(err))
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

	static change_password = (formData, callback) => {
		const {	old_password, new_password, _id } = formData;
		if(new_password && old_password){
			User.updateOne({_id, password: Base64.encode(old_password)}, {
				password: Base64.encode(new_password)
			}, (err, user) => {
				if(!err){
					// Call Reset password
					callback({
						success: true,
						user
					})
				}else{
					callback({
						success: false
					})
				}
			})
		}else{
			callback({success: false})
		}
	};

	static edit_settings = (formData, callback) => {
		const {_id, email } = formData;
		if(email){
			User.updateOne({_id},{email}, (err, user) => {
				if(!err){ // change to single statement
					callback({
						success: true,
						user
					})
				}else{
					callback({
						success: false
					})
				}
			})
		}else{
			callback({success: false})
		}
	}

	static forgot_password (email, callback){
		if(email){
			User.findOne({email}, (err, user) => {
				if(!err){
					const {email, password } = user;
					const token = Base64.encode(`${email}`);
					UserMail.forgot_password_mail(email, token, ({success, message, error}) => {
						callback({success, message, error})
					})
				}
			})
		}
	}

	static reset_password (formData, token, callback){
		const decode_token = Base64.decode(token);
		const decode_data = decode_token.split("-");
		try{
			console.log("Email is", decode_data[0])
			User.updateOne({
				email: decode_data[0]
			}, {
					active: true,
					password: Base64.encode(formData.password)
			}, (error, user) => {
				if(!error){
					// Call reset password email

					callback({
						success: true,
						message: "Password changed successfully"
					})
				}else{
					callback({
						success: false,
						error
					})
				}
			})
		}catch (e) {
			// error block
		}
	}

	static activate_account = ({token, language}, callback) => {
		try{
			User.findOne({token}, (err, user) => {
				if(!err){
					if(user){
						user["active"] = true;
						User.updateOne({email: user.email}, {
							active: true,
							updated_at: (new Date()),
							last_active: (new Date())
						} , (error, updated ) => {
							if(!error){
								// Send another email
								callback({
									success: true,
									user
								});
								UserMail.activate_account(user,language);
							}else{
								callback({success: false, error})
							}
						})
					}else{
						callback({
							success: false,
							error: err
						})
					}
				}
			})
		}catch (e) {

		}
	}
}


// var UserAPIController = {
// 	login: function(formData){
//
// 	}
// }

module.exports = UserAPIController;