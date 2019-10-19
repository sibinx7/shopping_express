const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
	project_id: String,
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
	validated: Boolean,
	admin_shortlisted: Boolean,
	jury_shortlisted: Boolean,
	finalist: Boolean,
	first_evaluation: Number,
	first_evaluation_base: Number,
	second_evaluation: Number,
	second_evaluation_base: Number,
	jury_evaluation: Number,
	voting: Number,
	voting_base: Number,
	user_id: {
		type: String,
		unique: true,
		required: true
	}
});

const Project = mongoose.model('Project', ProjectSchema);

export const ProjectCount = async (filter) => {
	 try{
		 const doc = await Project.countDocuments(filter);
		 return await doc
	 }catch (e) {

	 }
};

export default  Project