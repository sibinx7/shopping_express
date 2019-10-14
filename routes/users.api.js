var express = require('express');
var router = express.Router();
// var UserAPIController = require("../controllers/user.api.ctrl");
import UserAPIController from "../controllers/user.api.ctrl";
import ProjectAPIController from "../controllers/project.api.ctrl";
import jwt from "jsonwebtoken";



router.post("/login", (req, res, next) => {
	const formData = req.body;
	console.log(JSON.stringify(req.params));
	console.log(JSON.stringify(req.body))
	console.log("Inside routes...")
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

router.get("/user/show", (req, res, next) => {
	res.json({
		user: "Hello"
	})
});


router.put("/user/update", (req, res, next) => {
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

});


router.get("/project", (req, res, next) => {
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
});

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


router.post("/project", (req, res, next) => {
	const formData = req.body;
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
});

router.put("/project", (req, res, next) => {
	const formData = req.body;
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
})

module.exports = router;