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
		console.log(JSON.stringify(formData))
		console.log("####")
		Project.create(formData, (err, project) => {
			if(!err){
				callback({
					success: true,
					project
				})
			}else{
				callback({
					success: false,
					errors: project
				})
			}
		})
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