import {	each } from "underscore";


export const checkUserComplete = (userData) => {
	const requireFields = ["email", "first_name", "last_name", "nationality", "photo", 
	"qid", "dob", "mobile_no", "qid_no", "gender"]

	let tempComplete = true;
	each(requireFields, (item, index) => {
		try{
			if((userData && !userData[item])){
				tempComplete = false;
				return;
			}
		}catch (e) {
			tempComplete = false;
			return
		}
	});
	return {
		complete: tempComplete
	}
};
