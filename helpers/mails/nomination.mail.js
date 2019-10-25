import SETTINGS from "../../env.js";

import MailJET from "../../config/mailjet.config";
import {getEmailTemplate} from "./template";

let FromMails = [
	{
		"Email": SETTINGS.MAIL_FROM,
		"Name": "Akhlaquna"
	}
]
