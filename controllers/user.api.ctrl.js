import {omit} from "underscore";
var User  = require("../models/User");
import {	Base64 } from "js-base64";
import UserMail from "../helpers/mails/user.mail";
// import User from "../models/User";


export default class UserAPIController{
	static login = (formData, callback) => {
		User.findOne({
			email: formData.email ,
			password: formData.password,
			active: true
		})
			.populate("-password")
			.exec((err, user) => {
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
			})
	};

	static create = (formData, callback) => {
		console.log("Form data creation...")
		console.log(JSON.stringify(formData))
		if(formData.email && formData.password){
			const {	day, month, year, first_name, last_name, email } = formData;
			let {	password } = formData;
			let {	username } = formData
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
				const token = Base64.encode(`${username}-${password}`);
				if(token){
					userFields["token"] = token;
				}
			}catch (e) {

			}

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
						UserMail.send_email_sign_up(toMail, [], user , () => {
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
			User.updateOne({_id, password: old_password}, {
				password: new_password
			}, (err, user) => {
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


}


// var UserAPIController = {
// 	login: function(formData){
//
// 	}
// }

module.exports = UserAPIController;