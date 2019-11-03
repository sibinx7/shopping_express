const mongoose = require("mongoose");
const NewsletterSubscriberSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	created_at: Date,
	active: Boolean
});

const NewsletterSubscriber = mongoose.model("NewsletterSubscriber", NewsletterSubscriberSchema);

export default NewsletterSubscriber;