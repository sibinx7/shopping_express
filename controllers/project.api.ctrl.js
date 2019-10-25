import {omit, pick} from "underscore";
import Project, {ProjectCount} from "../models/Project";


export default class ProjectAPIController{

	static  list = (query={}, callback) => {
		let options = {
			limit: 5
		};

		const filters = omit(query, "per_page", "page");
		const pagination = pick(query, "per_page", "page");

		if(Object.keys(pagination).length){
			let {	per_page, page } = pagination;
			per_page = parseInt(per_page);
			page = parseInt(page);
			if(per_page){
				options["limit"] = per_page;
			}
			let skip = 0;
			if(page){
				skip = (page - 1) * options.limit;
			}
			options["skip"] = skip;
		}

		let filterOptions = {};
		if(filters){
			if(filters.search){
				filterOptions["title"] = {
					$regex: filters.search
				}
			}
			if(filters.status){
				switch (filters.status) {
					case "New":
						filterOptions["status"] = {
							$eq: "new"
						}
						break;
					case "validated":
					case "Validated":
						filterOptions["validated"] = {
							$eq: true
						}
						break;
					case "first_evaluation":
					case "First Evaluation":
						filterOptions["first_evaluation"] = {
							$ne: null
						}
						break;
					case "second_evaluation":
					case "Second Evaluation":
						filterOptions["second_evaluation"] = {
							$ne: null
						}
						break;
					case "rejected":
					case "Rejected":
						filterOptions["rejected"] = {
							$eq: true
						};
						break;
					default:
						break;
				}
			}
		}

		console.log(filterOptions)
		Project.countDocuments(filterOptions, (err_p, count) => {
			if(!err_p){
				console.log(err_p)
				Project.find(filterOptions, null , options, (err, data) => {
					console.log(err)
					if(!err){ // Code repetition, reduce repetition
						callback({
							success: true,
							projects:{
								data,
								meta:{
									total: count || 0,
									page: query.page || 1,
									per_page: options.limit || 10,
									count: data.length || 0
								}
							}
						})
					}else{
						callback({
							success: false,
							projects:{
								data:[],
								meta:{
									total: 0, page:1, per_page: options.limit, count:0
								}
							}
						})
					}
				});
			}else{
				console.log(err_p)
				callback({
					success: false
				})
			}
		})
	};

	static  list_by_user = (_id, query, callback) => {
		if(_id){
			let options = {
				limit: 10
			};

			if(Object.keys(query).length){
				let {	per_page, page } = query;
				per_page = parseInt(per_page);
				page = parseInt(page);
				if(per_page){
					options["limit"] = per_page;
				}
				let skip = 0;
				if(page){
					skip = (page - 1) * options.limit;
				}
				options["skip"] = skip;
			}

			Project.countDocuments({user_id: _id}, (err_p, count) => {

				if(!err_p){
					Project.find({user_id: _id},null, options, (err, data) => {
						if(!err){
							callback({
								success: true,
								projects:{
									data,
									meta:{
										total: count,
										page: query.page || 1,
										per_page: options.limit || 10,
										count: data.length
									}
								}
							})
						}else{
							callback({success: false}); // User DRY, this can be in single
						}
					})
				}else{
					console.log(err_p)
					callback({
						success: false
					})
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
		let checkProjectCompletion = false;
		try{
			if(formData.title){
				checkProjectCompletion = true;
			}
			if(formData.photo){
				checkProjectCompletion = true;
			}
			if(formData.question2 && formData.question6 && formData.question7){
				checkProjectCompletion = true;
			}

			const {	project } = formData;
			if(project.describe && project.sustainability && project.innovation){
				checkProjectCompletion = true;
			}
		}catch (e) {

		}

		if(_id){
			Project.updateOne({
				_id
			}, formData, (err, data) => {
				if(!err){
					if(formData.hasOwnProperty("submitted") && formData.submitted){
						if(formData.step === 3){
							Project.findOne({_id}, (err, projectData) => {
								if(err){
									let  projectStatus = checkProjectCompletion(projectData);
									if(projectData.submitted){
										// Send project complete mail
										
									}
								}
								callback({
									success: true,
									project: data
								});
							})
						}
					}

				}else{
					callback({
						success: false,
						errors: data
					})
				}
			})
		}
	}


	static delete = ({_id, user_id}, callback) => {
		console.log("Project ID", _id)
		console.log("User ID", user_id)
		if(_id){
			console.log("ID")
			Project.deleteOne({_id, user_id}, (error, response) => {
				console.log("After delete")
				console.log(JSON.stringify(error))
				console.log(JSON.stringify(response));
				if(!error){
					callback({
						success: true,
						response
					})
				}else{
					callback({
						success: false,
						error
					})
				}
			})
		}
	}
}