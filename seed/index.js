const User = require("../models/User");

/**
 * @description Create a super admin if no super admin user present
 */
User.countDocuments({super_admin: true}, (err,count) => {

	if(!err && count === 0){
		// Create a User
		console.log("Exisitng admins", count)
		User.deleteOne({email: "admin@admin.com"}, (err) => {
			if(!err){
				User.create({
					email: "admin@admin.com",
					username: "admin@admin.com",
					password: "123456",
					roles:["admin", "super_admin"],
					created_at: new Date(),
					updated_at: new Date(),
					first_name: "admin",
					gender: "Male",
					super_admin: true
				}, (err, user) => {
					console.log(JSON.stringify(err))
					if(!err){
						console.log("User created")
						console.log(JSON.stringify(user))
					}
				})
			}
		})

	}
});