import SETTINGS from "../../env.js";

import MailJET from "../../config/mailjet.config";
import {getEmailTemplate} from "./template";

let FromMails = [
	{
		"Email": SETTINGS.MAIL_FROM,
		"Name": "Akhlaquna"
	}
]

class UserMail {

	static send_email_sign_up(toMails, fromMails=[], user={}, language,  callback){
		console.log(JSON.stringify(user))
		console.log("User information...")
		if(fromMails.length){
			FromMails = [...FromMails, fromMails];
		}
		const language ="";
		/* REGISTER ACTIVATION */
		getEmailTemplate("register_activation", language, (html_content) => {
			/**
			 *
			 * `<h1>Thanks for sign up <a href="${SETTINGS.CLIENT_DOMAIN}">Akhlaquna</a></h1>
										<p>Please use this below link to activate your account</p>
										<p><a href="${SETTINGS.CLIENT_DOMAIN}/activate/${user.token || "xxx"}">Activate your Account</a></p>`
			 *
			 * @type {{Messages: {HTMLPart: *, TextPart: string, From: *, To: *, Subject: string}[]}}
			 */


			html_content = html_content.replace("{{akhlaquna_activation_link}}", `${SETTINGS.CLIENT_DOMAIN}/account-activation/${user.token}`);
			html_content = html_content.replace("{{akhlaquna_about_url}}", `${SETTINGS.CLIENT_DOMAIN_ABOUT}`);
			html_content = html_content.replace("{{akhlaquna_submit_project}}", `${SETTINGS.CLIENT_DOMAIN}/sign-in`);
			html_content = html_content.replace("{{akhlaquna_terms_url}}", `${SETTINGS.CLIENT_DOMAIN_TERMS}`);
			let messageInformation = {
				"Messages":[
					{
						"From": FromMails[0],
						"To": toMails,
						"Subject": "Confirm your Akhlaquna Account",
						"TextPart": "Thanks for sign up. Please use below token to activate your account",
						"HTMLPart": html_content
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
		});


	}

	static forgot_password_mail(email, token, callback){
		/* RESET PASSWORD */
		getEmailTemplate("reset_password","", (content_html) => {
			/**
			 * `
						<h2>Please reset your password from below link</h2>
						<p>Reset password <a href="${SETTINGS.CLIENT_DOMAIN}/reset-password/${token}">link</a></p>
					`
			 * @type {{Messages: {HTMLPart: undefined, From: *, To: {Email: *}[], Subject: string}[]}}
			 */

			content_html = content_html.replace("{{akhlaquna_reset_password_link}}", `${SETTINGS.CLIENT_DOMAIN}/reset-password/${token}`)

			let messageInformation = {
				"Messages":[
					{
						"From": FromMails[0],
						"To":[{
							"Email": email
						}],
						"Subject": "Reset your Password",
						"HTMLPart": content_html
					}
				]
			}
			const token_email = MailJET.post("send",{version:"v3.1"})
				.request(messageInformation);
			token_email.then((response) => {
				callback({
					success: true,
					message: "Forgot password reset mail sent"
				})
			}, (error) => {
				console.log(JSON.stringify(error))
				callback({
					success: false,
					error: "Forgot password mail not sent"
				})
			})
		})
	}


	static activate_account(user, language="", callback){

		let toMail = [
			{
				"Email": user.email,
				"Name": `${user.first_name} ${user.last_name}`
			}
		]

		getEmailTemplate("register", language, (content_html) => {
			content_html = content_html.replace("{{akhlaquna_award_end}}", SETTINGS.AKHLAQUNA_AWARD_END);
			content_html = content_html.replace("{{akhlaquna_add_project}}", `${SETTINGS.CLIENT_DOMAIN}/sign-in`);
			content_html = content_html.replace("{{akhlaquna_submit_project}}", `${SETTINGS.CLIENT_DOMAIN}/sign-in`);
			content_html = content_html.replace("{{akhlaquna_about_url}}", `${SETTINGS.CLIENT_DOMAIN_ABOUT}`);
			content_html = content_html.replace("{{akhlaquna_terms_url}}", `${SETTINGS.CLIENT_DOMAIN_TERMS}`);
			let messageInformation = {
				"Messages":[
					{
						"From": FromMails[0],
						"To":toMail,
						"Subject": "Thanks for signing up",
						"HTMLPart": content_html
					}
				]
			};
			const success_activation = MailJET.post("send", {version:"v3.1"})
				.request(messageInformation);

			success_activation.then((result) => {
				console.log("USER_REGISTER:Message send successfully")
			}, (error) => {
				console.log("USER_REGISTER:Message failed to send")
			})
		})
	}
}

export default UserMail;