require("dotenv").config();

const mailjet = require("node-mailjet");

const API_KEY = process.env.MAILJET_API_KEY;
const API_SECRET = process.env.MAILJET_SECRET_KEY;
const MailJET =  mailjet.connect(API_KEY, API_SECRET);

export default MailJET;