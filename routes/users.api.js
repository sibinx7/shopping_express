var express = require('express');
const app = express();
var router = express.Router();
import User from "../models/User";
// var UserAPIController = require("../controllers/user.api.ctrl");
import UserAPIController from "../controllers/user.api.ctrl";
import ProjectAPIController from "../controllers/project.api.ctrl";
import HelperAPIController from "../controllers/helper.api.ctrl";
import jwt from "jsonwebtoken";
require("dotenv").config();
const http = require("http");
const https = require("https");
const basic_auth = require("basic-auth");


const notification_routes = require("./users.notification.api");

const commonUserResponse = (result) => {
	const {success, user, projects} = result;
	let response = {};
	response["success"] = success;
	if(success){
		if(result.user){
			response["user"] = user;
		}
		if(result.projects){
			response["projects"] = projects;
		}
	}
	return response;
};

/* Without any Token verification */
router.post("/login", (req, res, next) => {
	const formData = req.body;
	console.log("I am loggined...")
	console.log(formData)
	console.log("?????")
	if(!formData){
		res.json({
			status: 404,
			success: false 
		})
	}
	console.log("User moved to another///")
	UserAPIController.login(formData, (response) => {
		console.log(response);
		if(response.success){
			try{
				let token = Base64.btoa(`${formData.email}:${formData.password}`);
				res.json({
					user: response.user,
					token,
					success: true
				})
			}catch (error) {
				res.json({
					success: false,
					error:error,
					...response
				})
			}
		}else{
			res.json({
				success: false,
				...response
			})
		}
	})
});


router.post("/register", (req, res, next) => {
	const formData = req.body;
	UserAPIController.create(formData, ({user, success, error, key}) => {
		if(success){
			res.json({
				success: true,
				user,
				redirect_to: "sign-in"
			})
		}else{
			res.json({
				success: false,
				status: 404,
				error,
				key
			})
		}
	})

});

const userActivateAccount = (req, res, next) => {
	const formData = req.body;
	try{
		if(!formData.token){
			throw new Error("Token not found")
		}
		UserAPIController.activate_account(formData, ({success, error, user}) => {
			let token = "";
			// token = jwt.sign({
			// 	username: user.email,
			// 	password: user.password
			// }, '777');
			token = Base64.btoa(`${user.email}:${user.password}`);
			res.json({
				success,
				error,
				user,
				token
			})
		})
	} catch (error) {
		res.json({
			success: false,
			error
		})
	}
}

router.post("/activate-account", userActivateAccount)
router.post("/change_password", (req, res, next) => {
	const formData = req.body;
	UserAPIController.change_password(formData, (result) => {
		const response = commonUserResponse(result);
		res.json(response);
	})
});
const  emailExistenceHandler = (req, res, next) => {
	const formData = req.body;
	try{
		let email = formData.email;
		if(!email){
			email = req.params.email;
		}
		HelperAPIController.email_availability(email, ({success, count}) => {
			if(success){
				res.json({
					success,
					count
				})
			}else{
				res.json({
					success
				})
			}
		})
	}catch (e) {
	}
}
router.get("/email_availability/:email?", emailExistenceHandler);
router.post("/email_availability/:email?", emailExistenceHandler);



const adminLoginHandler = (req, res, next) => {
	res.json({
		success: true
	})
};
router.post("/admin_login", adminLoginHandler);


const accountActivationHandler = (req, res, next) => {

};
router.post("/account-activation", accountActivationHandler);


const subscribeHandler = (req, res, next) => {
	try{
		const {	email } = req.params;
		if(email){
			HelperAPIController.subscribe(email, ({success, message, error}) => {
				res.json({
					success,
					message,
					error
				})
			})
		}else{
			throw new Error("Email address not found")
		}

	}catch (error) {
		res.json({
			success: false,
			error
		})
	}
};
router.post("/subscribe/:email", subscribeHandler);

const forgotPasswordHandler = (req, res, next) => {
	const formData = req.body;
	try{
		if(formData.email){
			UserAPIController.forgot_password(formData.email,({success, error, message}) => {
				res.json({
					success,
					error,
					message
				})
			})
		}else{
			res.json({
				success: false
			})
		}
	}catch (error) {
		res.json({
			success: false,
			error
		})
	}
};

router.post("/forgot-password/", forgotPasswordHandler);

const resetPasswordHandler = (req, res, next) => {

	try{
		const formData = req.body;
		const token = req.params.token;
		if(!token){
			throw new Error("Token is not present")
		}
		if(!formData.password && formData.password !== formData.confirm_password){
			throw new Error("Password and Confirm password are not equal")
		}
		UserAPIController.reset_password(formData, token, ({success, message, error}) => {
			res.json({
				success, error, message
			})
		})
	}catch (error) {
		res.json({
			success: false,
			error
		})
	}
};
router.post("/reset-password/:token", resetPasswordHandler );


const tweetHandler = (req, res, next) => {
	try{
		let isTwitterDisabled = process.env.DISABLE_TWITTER_ON_DEV_MODE || false;
		if(isTwitterDisabled === "true" || isTwitterDisabled === true){
			console.log("Twitter fetch is disabled in Development mode");
			throw new Error("Twitter disabled in development mode")
		}
		const TWITTER_ID = process.env.TWITTER_ID;
		const TWITTER_TOKEN = process.env.TWITTER_TOKEN;
		const requestOptions = {
			hostname:`api.twitter.com`,
			path:`/1.1/statuses/user_timeline.json?user_id=${TWITTER_ID}&count=2`,
			method:"GET",
			headers:{
				"Content-Type": "utf-8",
				Authorization:`Bearer ${TWITTER_TOKEN}`
			}
		};
		const requestGet = https.get(requestOptions,(response) => {
			let data ="";
			response.on("data", (result) => {
				data += result;
			});
			response.on("end", () => {
				let tweetData = JSON.parse(data);
				let tweets = {
					published_at: tweetData[0].created_at,
					content:{
						ar: tweetData[0].text,
						en: tweetData[1].text
					},
					thumbnail:{
						ar: tweetData[0].entities.media[0]["media_url"],
						en: tweetData[1].entities.media[0]["media_url"]
					}
				};
				res.json({
					success: true,
					tweets
				})
			})
		});
		requestGet.on("error", (error) => {
			res.json({
				success: false,
				error,
				tweets:{}
			})
		})

	}catch (e) {
		res.json({
			success: false,
			error:e,
			tweets:{}
		})
	}
};

router.get("/latest-tweets", tweetHandler);

const emailTemplateHandler = (req, res, next) => {
	HelperAPIController.check_email((result) => {
		res.send(result)
	})
};
router.get("/check-email-template", emailTemplateHandler);

const handleCheckQUIDs = (req, res, next) => {
	try{
		const formData = req.body;
		const {	qid } = req.params;
		if(qid){
			HelperAPIController.check_qid(qid, ({success, error, message}) => {
				res.json({
					success, error, message
				})
			})
		}
	}catch (e) {
		res.json({
			success: false,
			error: "QID not available"
		});
		res.statusCode(500);
	}


};
router.post("/check-qid/:qid?", handleCheckQUIDs);

/* end Without Token Validation */






const VerifyHeaderToken = (req, res, next) => {
	try{
		const headers = req.headers;
		const authorization = headers["authorization"];
		const current_user_id = headers["x_current_user_id"];
		const auth_decode = basic_auth(req);

		if(auth_decode && auth_decode.name && auth_decode.pass){
			let formData = {
				email: auth_decode.name,
				password: Base64.encode(auth_decode.pass)
			};
			User.findOne(formData, (err, user) => {
				if(!err){
					next();
				}else{
					res.status(401).end("Unauthorized access")
				}
			})
		}else{
			res.status(401).end("Unauthorized access")
		}
	}catch (e) {
		console.log(e);
		console.log("Some errors try catch...")
		res.status(401).end("Unauthorised access")
	}
};

router.use(VerifyHeaderToken);


/* With Token Validation */
const userShowRouteHandler = (req, res, next) => {
	const _id = req.params.id;
	UserAPIController.get(_id, ({success, user}) => {
		if(success){
			res.json({
				success: true,
				user
			})
		}else{
			res.json({
				success: false
			})
		}
	})
};

router.get("/user/:id",  userShowRouteHandler);

router.get("/edit_profile", userShowRouteHandler);

const userEditHandler = (req, res, next) => {
	const formData = req.body;
	UserAPIController.update(formData, ({success, user}) => {
		if(success){
			res.json({
				success: true,
				user
			})
		}else{
			res.json({
				success: false
			})
		}
	})
};

router.put("/user/update", userEditHandler);
router.post("/edit_profile", userEditHandler);
router.put("/edit_profile", userEditHandler);







const getAllProjectHandler = (req, res, next) => {
	const query = req.query;
	ProjectAPIController.list(query,({success, projects}) => {
		if(success){
			res.json({
				success,
				projects,
			})
		}else{
			res.json({
				success,
				projects:{data:[]}
			})
		}
	})
};

router.get("/project", getAllProjectHandler);
router.get("/get_all_projects", getAllProjectHandler);

router.get("/project/:id", (req, res, next) => {
	const project_id = req.params.id;
	ProjectAPIController.show(project_id, ({success, project}) => {
		if(success){
			res.json({
				success,
				project
			})
		}else{
			res.json({
				success: false
			})
		}
	})
})


const projectDataCreateHandler = (req, res, next) => {
	const formData = req.body;
	if(req.headers && req.headers["x_current_user_id"]){
		formData["user_id"] = req.headers["x_current_user_id"];
	}
	if(!formData.user_id){
		res.json({
			success: false,
			message: "Project cannot create, only a user can create Project"
		});
	}
	ProjectAPIController.create(formData, ({success, project, errors}) => {
		console.log(success)
		console.log(project)
		console.log(errors)
		if(success){
			res.json({
				success: true,
				project
			})
		}else{
			res.json({
				success: false,
				errors
			})
		}
	})
};

router.post("/project", projectDataCreateHandler);
router.post("/add_project_step1", projectDataCreateHandler);

const projectDataUpdateHandler = (req, res, next) => {
	const formData = req.body;
	if(req.headers && req.headers["x_current_user_id"]){
		formData["user_id"] = req.headers["x_current_user_id"];
	}
	console.log(formData.user_id)
	console.log("Current USER")
	ProjectAPIController.update(formData, ({success, project, errors, error}) => {
		console.log(errors)
		console.log(error)
		console.log("Update section...")
		if(success){
			res.json({
				success: true,
				project
			})
		}else{
			res.json({
				success: false,
				errors,
				error
			})
		}
	});
};



router.put("/project", projectDataUpdateHandler);
router.post("/add_project_step2", projectDataUpdateHandler);
router.post("/add_project_step3", projectDataUpdateHandler);
router.put("/add_project_step2", projectDataUpdateHandler);
router.put("/add_project_step3", projectDataUpdateHandler);



const projectDeleteHandler = (req, res, next) => {
	try{
		const projectID = req.params.id;
		let userID;
		if(req.headers && req.headers["x_current_user_id"]){
			userID = req.headers["x_current_user_id"];
		}
		if(projectID){
			ProjectAPIController.delete({_id: projectID, user_id: userID}, ({success, response, err}) => {
				res.json({
					success,
					response,
					err
				})
			})
		}
	}catch (e) {
		res.json({
			success: false
		})
	}
}

router.delete("/project/:id", projectDeleteHandler)

const projectByUserHandler = (req, res, next ) => {
	let user_id = req.headers["x_current_user_id"];
	let query = req.query;
	if(!user_id){
		user_id = req.query.user_id;
	}
	console.log("Current USER with X_USER_ID", user_id)
	if(user_id){
		ProjectAPIController.list_by_user(user_id, query, (result) => {
			res.json(commonUserResponse(result));
		})
	}else{
		res.json({success: false, error: "User not available"})
	}
};

router.get("/get_projects_by_user", projectByUserHandler)




const editSettingsHandler = (req, res, next) => {
	const formData = req.body;
	UserAPIController.edit_settings(formData, (result) => {
		res.json(commonUserResponse(result))
	});
};
router.post("/edit_settings", editSettingsHandler);





const statusNotificationHandler = (req, res, next) => {
	let user_id = req.headers["x_current_user_id"];
	console.log(user_id)
	console.log("Current status notifications...")
	HelperAPIController.status_notifications(user_id, ({success, error, notifications}) => {
		res.json({
			success,
			error,
			notifications 
		})
	});
}

router.get("/status-notifications", statusNotificationHandler)
router.use("/notifications", notification_routes);




module.exports = router;