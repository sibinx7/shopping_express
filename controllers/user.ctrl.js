import { User	} from "../models/User";
import {	getByID	} from "../services/user.service";

class UserController {

	/**
	 * @description Get user object with id
	 * @params id string 
	 * @return user object 
	 */
	static getByID = (id) => {
		return getByID(id);
	}


	static list = () => {

	}

	static show = () => {

	}

	static create = (formData, callback) => {
		Users.create(formData, function(err, data){			
			callback(err, data)
		})
	}

	static edit = () => {

	}

	static update = () => {

	}

	static delete = () => {
		
	}

}


modules.export = User;