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
	twitter: String,
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
	morals_extra: String,
	project: Object,
	how_hear: Array,
	how_hear_extra: String,
	additional_documents: Array,
	valuation_status:String,
	validated: Boolean,
	rejected: Boolean,
	status: String,
	admin_shortlisted: Boolean,
	jury_shortlisted: Boolean,
	finalist: Boolean,
	first_evaluation: Number,
	first_evaluation_base: Number,
	first_evaluation_position: Number,
	second_evaluation: Number,
	second_evaluation_base: Number,
	second_evaluation_position: Number,
	jury_evaluation: Number,
	jury_evaluation_base: Number,
	jury_evaluation_position: Number,
	voting: Number,
	voting_base: Number,
	voting_position: Number,
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