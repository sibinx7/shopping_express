import NotificationAPIController from "../controllers/notification.api.ctrl";

const express = require("express");
const router = express.Router();



const notificationHandler = (req, res, next) => {
	try{
		const query = req.query;
		const params = req.params;
		let {	type } = params;
		let {	per_page, page } = query;
		let options = {
			per_page,
			page
		};
		NotificationAPIController.list(type, options, ({success, result, errors}) => {
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

router.get("/:type?", notificationHandler);

module.exports = router;