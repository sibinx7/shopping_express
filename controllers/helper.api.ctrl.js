import Newsletter from "../helpers/mails/notification.mail";
import {getEmailTemplate} from "../helpers/mails/template";
import Project from "../models/Project";
import { checkProjectCompleteness } from '../helpers/projects/index';
import {checkUserComplete} from "../helpers/user";
const fs = require("fs");
const path = require("path");

const User  = require("../models/User");

class HelperAPIController {
	static email_availability (email, callback){
		console.log(JSON.stringify(email))
		console.log("Above one is email")
		User.countDocuments({email}, (err, count)=> {
			console.log("Inside User modal")
			console.log(count)
			console.log(JSON.stringify(err))
			if(!err){
				callback({
					success: true,
					count
				})
			}else{
				callback({
					success: false
				})
			}
		})
	}

	static subscribe = (email, callback) => {
		Newsletter.subscribe(email, ({success, message, error}) => {
			callback({success})
		})
	}

	static check_email = (callback) => {

		getEmailTemplate("notification_mail", null, (data) => {
			data = data.replace("{{akhlaquna_activation_link}}", "<SOME_LINK>");
			callback(data)
		});
	}

	static status_notifications(_id, callback ){

		User.findOne({_id}, (err,user) => {
			if(!err){
				// User information, call project 
				if(user){
					Project.findOne({user_id: user._id}, (error, project) => {
						let notifications = [];
						const user_completeness = checkUserComplete(user);
						if(project && !project.submitted){
							if(user_completeness && !user_completeness.complete){
								notifications.push({
									type: "warning",
									message:"Your profile is incomplete. Please add the missing information to be able to add a project. ",
									intl_key:"your_profile_incomplete_add_missing_to_add_project",
									show: true
								})
							}
						}

						if(!error){
							if(project){
								const project_completeness = checkProjectCompleteness(project);
								try{
									console.log(project_completeness)
									console.log(">>>>")
									const {	submitted, status, completed, date_diff} = project_completeness;
									if(!completed){
										notifications.push({
											type:"warning",
											message: "Your project is incomplete. Continue the missing part and submit before the deadline",
											intl_key: "project_is_incomplete",
											show: true
										})
									}
									if(!submitted && completed){
										notifications.push({
											type:"warning",
											message:"You have completed your project. Submit now",
											intl_key: "project_completed_submit_now",
											show: true
										})
									}
									if(completed && submitted){
										if(date_diff < 5){
											notifications.push({
												type: "success",
												message: "Your project was successfully submitted",
												intl_key: "project_submitted",
												show: true
											})
										}
									}
								}catch (e) {
									console.log(e)
									console.log("Profile incomplete message..")
									return
								}
							}
						}
						callback({
							success: true,
							notifications
						})
					})
				}else{
					callback({
						success: false,
						notifications:[]
					})
				}
			}else{
				callback({
					success: false,
					error: err,
					notifications:[]
				})
			}
		})
	}

	static check_qid(qid_no, callback){
		User.countDocuments({
			qid_no
		}, (err, count) => {
			if(!err){
				let responseData = {};
				if(count){
					responseData["error"] = "QID already existing";
				}else{
					responseData["message"] = "QID not exist"
				}
				responseData["success"] = !count;
				callback(responseData)
			}
		})
	}

}


export default HelperAPIController;