const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
	title:String,
	excerpt: String,
	description: String,
	date: Date,
	read: Boolean,
	seen: Boolean
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;