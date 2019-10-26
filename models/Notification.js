const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
	title:String,
	excerpt: String,
	description: String,
	created_at: Date,
	date: Date,
	read: Boolean,
	seen: Boolean,
	user_id: {
		type: String,
		required: true
	}
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;