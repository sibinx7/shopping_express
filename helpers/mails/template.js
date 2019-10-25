const fs = require("fs");
import SETTINGS from '../../env';
const path = require("path");
import {	each } from "underscore";

export const getEmailTemplate = (template, language="en", callback) => {

	let template_path="";
	switch (template) {
		case "register":
			template_path += "RegisterEmail";
			break;
		case "register_activation":
			template_path +="RegisterActivationEmail";
			break;
		case "reset_password":
			template_path += "ResetPassword";
			break;
		default:
			break;
	}
	if(language === "ar"){
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
		if(!err){
			callback(data)
		}else{
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
	"{{akhlaquna_award_end":SETTINGS.AKHLAQUNA_AWARD_END,
	"{{akhlaquna_award_end_date":SETTINGS.AKHLAQUNA_AWARD_END,
	"{{akhlaquna_award_open":SETTINGS.AKHLAQUNA_AWARD_OPEN,
	"{{akhlaquna_award_open_date":SETTINGS.AKHLAQUNA_AWARD_OPEN,
	"{{akhlaquna_complete_project}}":"",
	"{{akhlaquna_submit_project}}":"",
	"{{akhlaquna_add_project}}":"",	
}

export class BaseMail{
	
	static fill_with_placeholder (data){
		each(Object.keys(STATIC_PLACEHOLDERS), (item, index) => {
			data = data.replace(item, STATIC_PLACEHOLDERS[item]);
		})
		return data;
	}
}
