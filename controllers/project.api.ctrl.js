import {omit, pick} from "underscore";
import Project from "../models/Project";


export default class ProjectAPIController{

	static  list = (callback) => {
		Project.find({}, (err, data) => {
			if(!err){
				callback({
					success: true,
					projects:{
						data
					}
 				})
			}else{
				callback({
					success: false
				})
			}
		});
	}

	static  list_by_user = (_id, callback) => {
		if(_id){
			Project.find({user_id: _id}, (err, data) => {
				if(!err){
					callback({
						success: true,
						projects:{
							data
						}
					})
				}else{
					callback({success: false})
				}
			})
		}else{
			callback({
				success: false
			})
		}
	}

	static show = (_id, callback) => {
		Project.findOne({_id}, (err, project) => {
			if(!err){
				callback({
					success: true,
					project
				})
			}else{
				callback({
					success: false
				})
			}
		})
	}

	static create = (formData, callback) => {

		// Check whether a user already have one Project
		const user_id = formData["user_id"];
		Project.countDocuments({user_id}, (errors, count) => {
			console.log(JSON.stringify(errors))
			console.log(count)
			console.log("Count documents....")
			if(errors){
				callback({
					success: false,
					errors
				})
			}
			if(!errors && count){
				callback({
					success: false,
					errors: "User can create only one Project"
				})
			}

			if(!errors && !count){
				Project.create(formData, (err, project) => {
					if(!err){
						callback({
							success: true,
							project
						})
					}else{
						callback({
							success: false,
							errors: err
						})
					}
				})
			}
		});

	}


	static update = (formData, callback) => {
		const _id = pick(formData, "_id");
		formData = omit(formData, "_id", "_v");
		if(_id){
			Project.updateOne({
				_id
			}, formData, (err, data) => {
				if(!err){
					callback({
						success: true,
						project: data
					})
				}else{
					callback({
						success: false,
						errors: data
					})
				}
			})
		}
	}
}