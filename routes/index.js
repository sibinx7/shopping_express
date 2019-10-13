var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
var localStrategy = require("passport-local").Strategy;
var Schema = mongoose.Schema;
var User = require("../models/User");
// import User from "../models/User";

// const UserController = require("../controllers/user.ctrl");

var UserController = require("../controllers/user.ctrl");
// import {UserController} from "../controllers/user.ctrl";




passport.use(new localStrategy(function(username, password, done){

	User.findOne({username:username, password: password},function(err,user){
		console.log(err)
		console.log(user)
			if(!err){
				console.log("Success");
				return done(null, user);
			}
			return done(err)
		})
}));


passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});



/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.isAuthenticated()){
		res.redirect("/users")
	}else{
		res.render('index', { title: 'Hardware Shopping' });
	}

});

router.get("/login", function(req, res, next){
	if(req.isAuthenticated()){
		res.redirect("/users")
	}
	res.render("login")
});


router.post("/login-process", passport.authenticate("local", {
	successRedirect: '/users',
	failureRedirect: '/login',
}), function(req, res, next){
	res.redirect("/users")
});

router.get("/sign-up", function(req, res, next){
  res.render("sign_up")
});

router.post("/authenticate", function(req, res, next){

	console.log(JSON.stringify(UserController))
	console.log("Up controller")
  if(req.body.username && req.body.password){
		const formData = req.body;
    try{
			UserController.create(formData, (err, data) => {
				console.log("After create")
				console.log(JSON.stringify(err))
				console.log(JSON.stringify(data))

				if(!err){
					res.redirect("/users")
				}else{
					res.redirect("/login")
				}
			})

    }catch(e){
      console.log(e)
			console.log("Authenticate user errors")
    }
  }else{
    console.log("Username not available..")
    console.log(req.body.username)
    res.redirect("/login")
  }
  // next()
});

module.exports = router;
