import {omit, pick} from "underscore";
import Project from "../models/Project";


export default class ProjectAPIController{

	static  list = (callback) => {
		Project.find({}, (err, projects) => {
			if(!err){
				callback({
					success: true,
					projects
 				})
			}else{
				callback({
					success: false
				})
			}
		});
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