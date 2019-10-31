const fs = require("fs");
import SETTINGS from '../../env';
const path = require("path");
import {	each } from "underscore";

let FromMails = [
	{
		"Email": SETTINGS.MAIL_FROM,
		"Name": "Akhlaquna"
	}
];


/**
 * @method
 * @name getEmailTemplate
 * @summary Get email template based on template name and language
 * @param {string} template Template name
 * @param {string} language Current language (from client application)
 * @param {function}callback Callback after email successfully send or failed
 */
export const getEmailTemplate = (template, language="en", callback) => {
	let template_path="";
	switch (template) {
		case "nomination_invite_email":
			template_path += "NominationInviteEmail";
			break;
		case "notification_mail":
			template_path += "NotificationMail";
			break;
		case "project_incomplete":
			template_path += "ProjectIncomplete";
			break;
		case "project_submission_email":
			template_path += "ProjectSubmissionEmail";
			break;
		case "project_submitted":
			template_path += "ProjectSubmitted";
			break;
		case "register_activation":
			template_path +="RegisterActivationEmail";
			break;
		case "register":
			template_path += "RegisterEmail";
			break;
		case "reset_password":
			template_path += "ResetPassword";
			break;
		case "subscription":
			template_path += "Subscription";
			break;
		default:
			break;
	}
	if(["ar", "ar-QA"].indexOf(language) > -1){
		template_path += "_AR"
	}
	template_path +=".html";
	console.log("File path...")
	console.log(template_path)
	let filepath = path.join(__dirname, `../mails_templates/${template_path}`);
	console.log(filepath)
	console.log("Original file path")
	fs.readFile(filepath, "utf8", (err,data) => {
		console.log(JSON.stringify(err))
		try{
			if(!err){
				callback(data)
			}else {
				filepath = filepath.replace("_AR", "");
				fs.readFile(filepath, "utf8", (error, data_two) => {
					if (!error) {
						callback(data_two)
					} else {
						callback("")
					}
				})
			}
		}catch (e) {
			callback("")
		}
	})
}


const STATIC_PLACEHOLDERS = {
	"{{akhlaquna_url}}": SETTINGS.CLIENT_DOMAIN,
	"{{akhlaquna_domain}}": SETTINGS.CLIENT_DOMAIN,
	"{{akhlaquna_about_url":SETTINGS.CLIENT_DOMAIN_ABOUT,
	"{{akhlaquna_login_url}}":`${SETTINGS.CLIENT_DOMAIN}/sign-in`,
	"{{akhlaquna_login}}":`${SETTINGS.CLIENT_DOMAIN}/sign-in`,
	"{{akhlaquna_register_url}}":`${SETTINGS.CLIENT_DOMAIN}/sign-up`,
	"{{akhlaquna_register}}":`${SETTINGS.CLIENT_DOMAIN}/sign-up`,
	"{{akhlaquna_contact_url}}":"",
	"{{akhlaquna_contact}}":"",
	"{{akhlaquna_terms_url}}":"",
	"{{akhlaquna_terms}}":"",
	"{{akhlaquna_award_end}}":SETTINGS.AKHLAQUNA_AWARD_END,
	"{{akhlaquna_award_end_date":SETTINGS.AKHLAQUNA_AWARD_END,
	"{{akhlaquna_award_open":SETTINGS.AKHLAQUNA_AWARD_OPEN,
	"{{akhlaquna_award_open_date":SETTINGS.AKHLAQUNA_AWARD_OPEN,
	"{{akhlaquna_complete_project}}":"",
	"{{akhlaquna_submit_project}}":"",
	"{{akhlaquna_add_project}}":"",
	"{{akhlaquna_project_id}}":"",
	"{{akhlaquna_project_details}}":`${SETTINGS.CLIENT_DOMAIN}/sign-in`,
	"{{akhlaquna_year}}": (new Date()).getFullYear()
}

export class BaseMail{
	
	static fill_with_placeholder (data){
		each(Object.keys(STATIC_PLACEHOLDERS), (item, index) => {
			data = data.replace(item, STATIC_PLACEHOLDERS[item]);
		})
		return data;
	}
};

export const setCommonMessageInformation = (toMails,htmlContent, textContent="", subject) => {

			let messageInformation = {
				"Messages":[
					{
						"From": FromMails[0],
						"To":toMails,
						"Subject": subject,
						"textPart":textContent,
						"HTMLPart": htmlContent
					}
				]
			};


			return messageInformation;
}	