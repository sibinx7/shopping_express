require("dotenv").config();
const SETTINGS = {
	MAIL_FROM:  process.env.MAIL_FROM || "info@akhlaquna.qa",
	MAIL_CC: process.env.MAIL_CC || "info@zartek.in",
	CLIENT_DOMAIN: process.env.CLIENT_DOMAIN || "http://localhost:3000",
	CLIENT_DOMAIN_TERMS: process.env.CLIENT_DOMAIN_TERMS || "https://dev.akhlaquna.qa/terms",
	CLIENT_DOMAIN_ABOUT: process.env.CLIENT_DOMAIN_ABOUT || "https://dev.akhlaquna.qa/about",
	AKHLAQUNA_AWARD_OPEN: process.env.AKHLAQUNA_AWARD_OPEN || "25th October 2019",
	AKHLAQUNA_FACEBOOK_LINK: process.env.AKHLAQUNA_FACEBOOK_LINK || "https://www.facebook.com/akhlaqunaqa/",
	AKHLAQUNA_TWITTER_LINK: process.env.AKHLAQUNA_TWITTER_LINK || "https://twitter.com/akhlaqunaqa",
	AKHLAQUNA_INSTAGRAM_LINK: process.env.AKHLAQUNA_INSTAGRAM_LINK || "https://www.instagram.com/akhlaquna/"
};



export default SETTINGS;