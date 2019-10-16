var express = require('express');
var router = express.Router();
// var UserAPIController = require("../controllers/user.api.ctrl");
import UserAPIController from "../controllers/user.api.ctrl";
import ProjectAPIController from "../controllers/project.api.ctrl";
import HelperAPIController from "../controllers/helper.api.ctrl";
import jwt from "jsonwebtoken";


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

router.post("/login", (req, res, next) => {
	const formData = req.body;
	if(!formData){
		res.json({
			status: 404
		})
	}
	UserAPIController.login(formData, (response) => {
		console.log(JSON.stringify(response))
		console.log("After process...")
		if(response.success){
			try{
				const token = jwt.sign({
					username: response.user.username,
					password: response.user.password
				}, "777");

				res.json({
					user: response.user,
					token
				})
			}catch (e) {
				res.json({
					success: false,
				})
			}

		}else{
			res.json({
				success: false,
			})
		}
	})
});


router.post("/register", (req, res, next) => {
	const formData = req.body;
	UserAPIController.create(formData, ({user, success}) => {
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
			})
		}
	})

});


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

router.get("/user/:id", userShowRouteHandler);

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
	ProjectAPIController.list(({success, projects}) => {
		if(success){
			res.json({
				data: projects,
				meta:{}
			})
		}else{
			res.json({
				data: []
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
	ProjectAPIController.create(formData, ({success, project, errors}) => {
		if(success){
			res.json({
				success: true,
				project
			})
		}else{
			res.json({
				success: false,
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
	ProjectAPIController.update(formData, ({success, project, errors}) => {
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
	});
};



router.put("/project", projectDataUpdateHandler);
router.post("/add_project_step2", projectDataUpdateHandler);
router.post("/add_project_step3", projectDataUpdateHandler);
router.put("/add_project_step2", projectDataUpdateHandler);
router.put("/add_project_step3", projectDataUpdateHandler);



const projectByUserHandler = (req, res, next ) => {
	let user_id = req.headers["x_user_id"];
	if(!user_id){
		user_id = req.query.user_id;
	}
	console.log("Current USER with X_USER_ID", user_id)
	if(user_id){
		ProjectAPIController.list_by_user(user_id, (result) => {
			res.json(commonUserResponse(result));
		})
	}else{
		res.json({success: false})
	}
};

router.get("/get_projects_by_user", projectByUserHandler)


router.post("/change_password", (req, res, next) => {
	const formData = req.body;
	UserAPIController.change_password(formData, (result) => {
		const response = commonUserResponse(result);
		res.json(response);
	})
});

const editSettingsHandler = (req, res, next) => {
	const formData = req.body;
	UserAPIController.edit_settings(formData, (result) => {
		res.json(commonUserResponse(result))
	});
};
router.post("/edit_settings", editSettingsHandler);



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
router.post("/admin_login", adminLoginHandler)

module.exports = router;