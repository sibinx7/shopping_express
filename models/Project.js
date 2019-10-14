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
	published:  Boolean,
	created_at: Date,
	updated_at: Date,
	saved_at: Date,
	draft: Boolean,
	assets: String,
	image: String
});

const Project = mongoose.model('Project', ProjectSchema);
export default  Project