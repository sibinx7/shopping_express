import NewsletterMail from "../helpers/mails/notification.mail";
import {getEmailTemplate} from "../helpers/mails/template";
import Project from "../models/Project";
import { checkProjectCompleteness } from '../helpers/projects/index';
import {checkUserComplete} from "../helpers/user";
import NewsletterSubscriber from "../models/NewsletterSubscriber";
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

		NewsletterSubscriber.countDocuments({email}, (err, emailCount) => {
			if(!err){
				if(emailCount){ // Al	ready exists
					callback({
						success: false,
						message: "This email address already subscribed",
						error: "Email already exist",
						code: "you_already_subscribed"
					})
				}else{ // Create mew
					const formData = {
						email,
						created_at: new Date()
					};
					NewsletterSubscriber.create(formData, (err, newsletter) => {
						if(!err){
							if(newsletter){ // created
								NewsletterMail.subscribe(email, ({success, message, error}) => {
									callback({success, code:"thank_you_for_subscribing", message:"Thank you for subscribing"})
								})
							}else{
								callback({
									success: false,
									error:"Mail not send",
									message: "Email successfully saved to database",
								})
							}
						}
					})
				}
			}else{
				callback({
					success: false
				})
			}
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
						// if(project && !project.submitted){
							if(user_completeness && !user_completeness.complete){
								notifications.push({
									type: "warning",
									message:"Your profile is incomplete. Please add the missing information to be able to add a project.",
									intl_key:"project_profile_incomplete_notification",
									show: true
								})
							}
						// }

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
											intl_key: "project_incomplete_notification",
											show: true
										})
									}
									if(!submitted && completed){
										notifications.push({
											type:"warning",
											message:"You have completed your project. Submit now",
											intl_key: "project_completed_notification",
											show: true
										})
									}
									if(completed && submitted){
										if(date_diff < 5){
											notifications.push({
												type: "success",
												message: "Your project was successfully submitted",
												intl_key: "project_submitted_notification",
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