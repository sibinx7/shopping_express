import {omit} from "underscore";
var User  = require("../models/User");
// import User from "../models/User";


export default class UserAPIController{
	static login = (formData, callback) => {
		User.findOne({
			email: formData.email ,
			password: formData.password
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
			const {	day, month, year, password, first_name, last_name, email } = formData;
			let {	username } = formData
			let dob = `${year}-${month}-${day}`;
			console.log(dob)
			dob = new Date(dob);
			console.log(dob)
			console.log("Date is above")
			if(!username){
				username = email
			}
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