var express = require('express');
var router = express.Router();
var passport = require("passport");


import {	UserController	} from "../controllers/user.ctrl";


router.use(function(req, res, next){
	console.log("Check Auth before start...")
	console.log(req.isAuthenticated())
	if(req.isAuthenticated()){
		return next();
	}else{
		res.redirect("/login")
	}
})

/* GET users listing. */
router.get('/',function(req, res, next) {
	console.log("User page")
	var user = req.user || {};
  res.render('user', {
    title: "Logged User",
    user: user
  });
});

router.get("/:id", (req, res, next) => {
	const id = req.body.id;
	const userObject = UserController.getByID(id)

})



module.exports = router;
