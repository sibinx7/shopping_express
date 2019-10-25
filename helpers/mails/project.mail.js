import SETTINGS from "../../env.js";

import MailJET from "../../config/mailjet.config";
import {	BaseMail, getEmailTemplate	} from "./template";


let FromMails = [
	{
		"Email": SETTINGS.MAIL_FROM,
		"Name": "Akhlaquna"
	}
]


class ProjectMail extends BaseMail{

	static project_in_complete(toMail, fromMails=[], language, callback){

	}

	static project_complete(){

	}

	static project_submission(){

	}

	static project_submitted(){

	}

	static 

}

export default ProjectMail;