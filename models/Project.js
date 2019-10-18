const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	video: String,
	website: String,
	facebook: String,
	instagram: String,
	linkedin: String,
	created_at: Date,
	updated_at: Date,
	saved_at: Date,
	published:  Boolean,
	draft: Boolean,
	submitted: Boolean,
	completed: Boolean,
	assets: String,
	image: String,
	photo: String,
	morals:Array,
	project: Object,
	how_hear: Array,
	additional_documents: Array,
	user_id: String
});

const Project = mongoose.model('Project', ProjectSchema);
export default  Project