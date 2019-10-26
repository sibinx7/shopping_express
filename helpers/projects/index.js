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
	console.log("++++++++++++++++++++++++++++++++++++++++++")
	let status = "incomplete";
	const requiredFields = ["title", "photo", "how_hear", "morals", "website"];
	let tempCompleted = true;
	// console.log(projectData)
	each(requiredFields, (field, index) => {
		if(typeof projectData[field] === "undefined" && !projectData[field]){
			tempCompleted = false;
			return true;
		}
	});

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
				if(!projectData["project"]){
					tempCompleted = false;
				}
				if(projectData["project"]){
					const {	project } = projectData;
					if(typeof project[item] === "undefined" || !project[item]){
						tempCompleted = false;
						return true;
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

		if(tempCompleted && typeof projectData["project"] === "undefined"){
			const requiredFields = ["question1", "question2", "question6", "question7", "question8"];
			each(requiredFields, (item, index) => {
				if(typeof projectData[item] === "undefined" || !projectData[item]){
					console.log("Question ", item)
					tempCompleted = false;
					return true
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
			if(typeof projectData["submitted"] !== "undefined" && !!projectData.submitted){
				return {
					submitted: true,
					completed: true,
					status: "submitted"
				}
			}else if(typeof projectData["submitted"] === "undefined" || !!projectData["completed"]){
				return {
					submitted: false,
					completed: true,
					status: "completed"
				}
			}
		}
	}
};