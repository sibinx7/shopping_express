import Newsletter from "../helpers/mails/notification.mail";

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
}


export default HelperAPIController;