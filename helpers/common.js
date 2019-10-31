export const dateDifference = (date1, date2) => {
	const diffTime = Math.abs(date2 - date1);
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	if(!isNaN(diffDays)){
		return diffDays;
	}else{
		return "";
	}
}

export const getProjectNumber = (id, length = 8) => {
	let ID="";
	try{
		ID = id.substr(0,length)
	}catch (e) {
	}
	return ID;
};