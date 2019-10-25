import {	each } from "underscore";


export const checkUserComplete = (userData) => {
	let status = "incompleete";
	const requireFields = ["email", "first_name", "last_name", "nationality", "photo", 
	"qid", "dob", "mobile_no", "qid_no", "gender"]

	let tempComplete = true;
	each(requireFields, (item, index) => {
		if(userData.hasOwnProperty(item) || !userData[item]){
			tempComplete = false;
			return;
		}
	});

	return {
		complete: tempComplete
	}

}