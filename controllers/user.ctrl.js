import User from "../models/User";
import {	getUserByID	} from "../services/user.service";

export class UserController {

	/**
	 * @description Get user object with id
	 * @params id string 
	 * @return user object 
	 */
	static getByID = (id) => {
		return getUserByID(id);
	}


	static list = () => {

	}

	static show = () => {

	}

	static create = (formData, callback) => {
		console.log("Create section....")
		try{
			User.create(formData, function(err, data){
				callback(err, data)
			})
		}catch (e) {
			console.log("User create error.");
			console.log(e)
		}

	}

	static edit = () => {

	}

	static update = () => {

	}

	static delete = () => {
		
	}

}




