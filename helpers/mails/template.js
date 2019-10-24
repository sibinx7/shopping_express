const fs = require("fs");
const path = require("path");

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
};