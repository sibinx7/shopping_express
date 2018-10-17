var express = require('express');
var router = express.Router();
var passport = require("passport");


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



module.exports = router;
