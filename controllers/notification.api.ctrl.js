import {	omit, pick } from "underscore";
import Notification from "../models/Notification";


/**
 * @description Update notification based on different actions
 */
export default class NotificationAPIController {

	static list = (filter={}, query, callback) => {
		let options = {limit:10, skip: 0};
		if(query.per_page){
			options["limit"] = parseInt(query.per_page);
		}
		if(query.page){
			options.page = parseInt(query.page)
			if(query.page === 1 || query.page === 0){
				options["skip"] = 0;
			}
			if(query.page > 1){
				options["skip"] = (options.limit) * (query.page - 1);
			}
		}
		Notification.countDocuments(filter, (errCount, count) => {
			if(!errCount){
				Notification.find(filter, null, options, (err, notifications) => {
					if(!err){
						callback({
							success: true,
							result:{
								data: notifications,
								meta:{
									total: count,
									page: query.page || 1,
									per_page: options.limit,
									count: notifications.length
								}
							}
						})
					}else{
						callback({
							success: false,
							errors: err
						})
					}
				})
			}else{
				callback({
					success: false,
					errors: errCount
				})
			}
		})

	};

	static unread(options,callback){

	};

	static mark_as_read(){

	};

	static delete(){

	}

	static create(){

	}

}