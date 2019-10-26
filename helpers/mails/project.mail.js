import SETTINGS from "../../env.js";

import MailJET from "../../config/mailjet.config";
import {	BaseMail, getEmailTemplate, setCommonMessageInformation	} from "./template";



let FromMails = [
	{
		"Email": SETTINGS.MAIL_FROM,
		"Name": "Akhlaquna"
	}
]




class ProjectMail{

	static project_in_complete(toMails, language, user, project, callback){
		getEmailTemplate("project_incomplete", language, (content_html) => {

			content_html = BaseMail.fill_with_placeholder(content_html);	

			let messageInformation = setCommonMessageInformation(toMails, content_html, text_content);
			const project_incomplete_mail = MailJET.post("send", {version:"v3.1"})
				.request(messageInformation);
			
			project_incomplete_mail.then((response) => {
				callback({
					success: true,
					message: "Project incomplete message send"
				})
			}, (error) => {
				callback({
					success: false,
					message: "Project incomplete message failed",
					error 
				})
			});



		});
	}

	static project_complete(){
		

	}

	static project_submission(language, user, project, callback){
		getEmailTemplate("project_submission_email", language, (html_content) => {
			html_content = BaseMail.fill_with_placeholder(html_content);
			const toMails = [
				{
					"Email": user.email,
					"Name": `${user.first_name} ${user.last_name}`
				}
			]
			let messageInformation = setCommonMessageInformation(toMails, html_content);
			const project_submission_mail = MailJET.post("send", {version:"v3.1"})
				.request(messageInformation);
			project_submission_mail.then((response) => {
				callback({success: true, message:"Project submission message send"})
			}, (error) => {
				callback({success: false, message:"Project submission message failed to send", error})
			})
		})
	}

	static project_submitted(language, user, project, callback){
		const toMails = [
			{
				"Email": user.email,
				"Name": `${user.first_name} ${user.last_name}`
			}
		]
		try{
			getEmailTemplate("project_submitted", language, (html_content) => {
				html_content = BaseMail.fill_with_placeholder(html_content);
				let text_content = "";
				let messageInformation = setCommonMessageInformation(toMails, html_content, text_content);
				const project_submitted = MailJET.post("send", {version:"v3.1"})
				request(messageInformation)
				project_submitted.then((response) => {
					callback({success: true, message: "Project submitted message send"})
				}, (error) => {
					callback({success: false, message: "Project submitted message failed", error})
				})

			})
		}	catch (e) {
			console.log("Project mail error")
			console.log(e)
		}
	}	



}

export default ProjectMail;