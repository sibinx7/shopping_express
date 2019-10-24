import Newsletter from "../helpers/mails/notification.mail";
import {getEmailTemplate} from "../helpers/mails/template";
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

		getEmailTemplate("register", null, (data) => {
			data = data.replace("{{akhlaquna_activation_link}}", "<SOME_LINK>");
			callback(data)
		});
	}
}


export default HelperAPIController;