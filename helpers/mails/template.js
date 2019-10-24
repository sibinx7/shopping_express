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
		if(!err){
			callback(data)
		}else{
			callback("")
		}
	})
};