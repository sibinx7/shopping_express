import SETTINGS from "../../env.js";

import MailJET from "../../config/mailjet.config";

let FromMails = [
	{
		"Email": SETTINGS.MAIL_FROM,
		"Name": "Akhlaquna"
	}
]

class UserMail {

	static send_email_sign_up(toMails, fromMails=[], user={},  callback){
		console.log(JSON.stringify(user))
		console.log("User information...")
		if(fromMails.length){
			FromMails = [...FromMails, fromMails];
		}
		let messageInformation = {
			"Messages":[
				{
					"From": FromMails[0],
					"To": toMails,
					"Subject": "Confirm your Akhlaquna Account",
					"TextPart": "Thanks for sign up. Please use below token to activate your account",
					"HTMLPart": `<h1>Thanks for sign up <a href="${SETTINGS.CLIENT_DOMAIN}">Akhlaquna</a></h1>
										<p>Please use this below link to activate your account</p>
										<p><a href="${SETTINGS.CLIENT_DOMAIN}/activate/${user.token || "xxx"}">Activate your Account</a></p>`
				}
			]
		};

		console.log(JSON.stringify(messageInformation))
		console.log("Message data...")

		const token_request = MailJET.post("send", { version:"v3.1"})
			.request(messageInformation);
		token_request.then((result) => {
			console.log("Mail send successfully")
		}, (error) => {
			console.log(JSON.stringify(error))
			console.log("Mail failed to send")
		})
	}
}

export default UserMail;