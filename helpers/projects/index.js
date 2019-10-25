import {	each	} from "underscore";
/**
 * @method
 * @name checkProjectCompleteness
 * @summary Check project status
 * @example
 * 	checkProjectCompleteness(project) => incomplete|complete|submitted
 * @description Check for Project status
 * @param {object} projectData Project information
 * @return {object} status Project status incomplete|complete|submitted
 *
 */

export const checkProjectCompleteness = (projectData) => {
	let status = "incomplete";
	const requiredFields = ["title", "photo", "how_hear", "morals", "website"];
	let tempCompleted = true;
	each(requiredFields, (field, index) => {
		if(!projectData.hasOwnProperty(field) && !projectData[field]){
			tempCompleted = false;
			return;
		}
	})
	if(!tempCompleted){
		return {
			status,
			completed: false,
			submitted: false
		}
	}
	if(tempCompleted){
		if(projectData.hasOwnProperty("project")){
			const requiredProjectFields = ["describe", "innovation", "sustainability"];
			each(requiredProjectFields, (item, index) => {
				if(!projectData.hasOwnProperty("project")){
					tempCompleted = false;
				}
				if(projectData.hasOwnProperty("project")){
					const {	project } = projectData;
					if(!project.hasOwnProperty(item) || !project[item]){
						tempCompleted = false;
						return;
					}
				}
			})
		}

		if(!tempCompleted){
			return  {
				status,
				completed: false,
				submitted: false
			}
		}

		if(tempCompleted && projectData.hasOwnProperty("project")){
			const requiredFields = ["question1", "question2", "question6", "question7", "question8"];
			each(requiredFields, (item, index) => {
				if(!projectData.hasOwnProperty(item) || !projectData[item]){
					tempCompleted = false;
					return
				}
			})
		}

		if(!tempCompleted){
			return {
				status,
				completed: false,
				submitted: false
			}
		}

		if(tempCompleted){
			if(projectData.hasOwnProperty("submitted") && projectData.submitted){
				return {
					submitted: true,
					completed: true,
					status: "submitted"
				}
			}else{
				return {
					submitted: false,
					completed: true,
					status: "completed"
				}
			}
		}
	}
};