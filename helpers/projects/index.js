import {	each	} from "underscore";
import {dateDifference} from "../common";
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
	try{
		let status = "incomplete";
		const requiredFields = ["title", "photo", "how_hear", "morals", "website"];
		let tempCompleted = true;
		// console.log(projectData)
		each(requiredFields, (field, index) => {
			if(typeof projectData[field] === "undefined" || (projectData && !projectData[field])){
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
				if(projectData && typeof projectData["submitted"] !== "undefined" && !!projectData.submitted){
					let currentTime = new Date();
					let lastActiveTime = new Date(projectData.updated_at);
					// check how long it exist
					const diffDates = dateDifference(currentTime, lastActiveTime);
					return {
						submitted: true,
						completed: true,
						status: "submitted",
						date_diff: diffDates
					}
				}else if((typeof projectData["submitted"] === "undefined" || !projectData.submitted) || !!projectData["completed"]){
					return {
						submitted: false,
						completed: true,
						status: "completed"
					}
				}else{
					return {
						submitted: false,
						completed: false,
						status: "incomplete"
					}
				}
			}
		}
	}catch (e) {
		console.log(e);
		return {
			submitted: false,
			completed: false,
			status:"incomplete"
		}
	}
};