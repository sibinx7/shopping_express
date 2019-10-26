import SETTINGS from "../../env.js";

import MailJET from "../../config/mailjet.config";
import {NewsletterTemplate} from "../templates/newsletter.tpl";

let FromMails = [
	{
		"Email": SETTINGS.MAIL_FROM,
		"Name": "Akhlaquna"
	}
]


class Newsletter {
	static subscribe (email, callback) {
		let newsletterTemplate = NewsletterTemplate();
		let messageInformation = {
			"Messages":[
				{
					"From": FromMails[0],
					"To":[
						{
							"Email": email
						}
					],
					"Subject":"Thank you for subscribing",
					"HTMLPart": newsletterTemplate
				}
			]
		}

		const newsletterMail = MailJET.post("send",{version:"v3.1"}).request(messageInformation);
		newsletterMail.then((result) => {
			console.log("Newsletter mail send successfully");
			callback({
				success: true,
				message: "Message send successfully"
			})
		}, (error) => {
			console.log(JSON.stringify(error));
			console.log("Newsletter mail failed to send")
			callback({
				success:false,
				error
			})
		})
	}

}

export default Newsletter;