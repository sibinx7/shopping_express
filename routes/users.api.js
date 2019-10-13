var express = require('express');
var router = express.Router();
// var UserAPIController = require("../controllers/user.api.ctrl");
import UserAPIController from "../controllers/user.api.ctrl";
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
			const token = jwt.sign({
				username: response.user.username,
				password: response.user.password
			}, "777");

			res.json({
				user: response.user,
				token
			})
		}else{
			res.json({
				success: false,
			})
		}
	})
});

router.get("/user", (req, res, next) => {

});

module.exports = router;