import {	getByID	} from "../services/user.service";

class User {

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

	static create = () => {

	}

	static edit = () => {

	}

	static update = () => {

	}

	static delete = () => {
		
	}

}


modules.export = User;