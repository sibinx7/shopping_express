const User = require("../models/User");

/**
 * @description Create a super admin if no super admin user present
 */
User.countDocuments({super_admin: true}, (err,count) => {
	if(!err){
		// Create a User
		User.deleteOne({email: "admin@admin.com"}, (err) => {
			if(!err){
				User.create({
					email: "super_admin@admin.com",
					username: "super_admin@admin.com",
					password: "123456",
					roles:["super_admin"],
					created_at: new Date(),
					updated_at: new Date(),
					first_name: "super",
					last_name: "admin",
					gender: "Male",
					super_admin: true,
					admin: false
				}, (err, user) => {
					if(!err){
					}
				})
			}
		})
	}
	console.log("Updating password...")

	User.updateOne({email:"super_admin@admin.com"},{
		password: Base64.encode("123456"),
		updated_at: new Date()
	}, (err, user) => {
		console.log(JSON.stringify(err))
		console.log(JSON.stringify(user))
		console.log("User update one....")
	})
});


User.countDocuments({admin: true}, (err, count) => {
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
		});
	}

	User.updateOne({
		email:"admin@admin.com"
	}, {
		password: Base64.encode("123456"),
		updated_at: new Date()
	});

});
