import NotificationAPIController from "../controllers/notification.api.ctrl";

const express = require("express");
const router = express.Router();



const notificationHandler = (req, res, next) => {
	try{
		const headers = req.headers;
		const user_id = headers["x_current_user_id"];
		const query = req.query;
		const params = req.params;
		let {	type } = params;
		let {	per_page, page } = query;
		let options = {
			per_page,
			page
		};
		let filter = {
			user_id
		};
		if(type){
			filter["seen"] = false;
		}
		NotificationAPIController.list(filter, options, ({success, result, errors}) => {
			res.json({
				success,
				result,
				errors
			})
		})
	}catch (e) {
		res.json({
			success: false,
			error: JSON.stringify(e)
		})
	}


};

router.get("/list/:type?", notificationHandler);


const handleUnseenNotificationCount = () => {

}

router.get("/unseen", handleUnseenNotificationCount)

module.exports = router;