import {Base64} from "js-base64";
const User = require("../models/User");


/**
 * @description Create a super admin if no super admin user present
 */
User.countDocuments({super_admin: true}, (err,count) => {
	if(!err){
		// Create a User
		if(count === 0){
			User.create({
				email: "super_admin@admin.com",
				username: "super_admin@admin.com",
				password: Base64.encode("123456"),
				roles:["super_admin"],
				created_at: new Date(),
				updated_at: new Date(),
				first_name: "super",
				last_name: "admin",
				gender: "Male",
				super_admin: true,
				admin: false,
				active: true
			}, (err, user) => {
				if(!err){
				}
			});
		}else{
			console.log("Updating super admin password...");
			console.log(Base64.encode("123456"))
			User.updateOne({email:"super_admin@admin.com"},{
				password: Base64.encode("123456"),
				updated_at: new Date(),
				active: true
			}, (err, user) => {
				console.log(JSON.stringify(err))
				console.log(JSON.stringify(user))
				console.log("Super admin update one....")
			})
		}
		// User.deleteOne({email: "admin@admin.com"}, (err) => {
		// 	if(!err){
		//
		// 	}
		// })
	}

});


User.countDocuments({email: "admin@admin.com"}, (err, count) => {
	console.log("Admin user count", count)
	if(!err && count === 0){
		User.create({
			email: "admin@admin.com",
			username: "admin@admin.com",
			password: Base64.encode("123456"),
			roles:["admin"],
			created_at: new Date(),
			updated_at: new Date(),
			first_name: "admin",
			gender:"Male",
			super_admin: false,
			admin: true,
			active: true
		});
	}else{
		console.log("Admin user update soon..")
		console.log(Base64.encode("123456"))
		User.updateOne({
			email:"admin@admin.com"
		}, {
			password: Base64.encode("123456"),
			updated_at: new Date(),
			active: true
		}, (err, user) => {
			console.log(JSON.stringify(err))
			console.log(JSON.stringify(user))
			console.log("Admin user updated...")
		});
	}
});
