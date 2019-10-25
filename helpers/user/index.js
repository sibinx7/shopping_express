import {	each } from "underscore";


export const checkUserComplete = (userData) => {
	let status = "incompleete";
	const requireFields = ["email", "first_name", "last_name", "nationality", "photo", 
	"qid", "dob", "mobile_no", "qid_no", "gender"]

	let tempComplete = true;
	each(requireFields, (item, index) => {
		if(userData.hasOwnProperty(item) || !userData[item]){
			console.log(item)
			console.log(userData.hasOwnProperty(item))
			tempComplete = false;
			console.log("***********")
			return;
		}
	});

	return {
		complete: tempComplete
	}

}