const express = require("express");
const router = express.Router();
const graphHTTP = require("express-graphql");
const {	buildSchema, GraphQLSchema, GraphQLList, GraphQLObjectType, GraphQLString	} = require("graphql");
const User = require("../models/User");



const userType = new GraphQLObjectType({
	name:"user",
	fields:{
		_id: {
			type: GraphQLString
		},
		username: {
			type: GraphQLString
		},
		password:{
			type: GraphQLString
		}
	}
});

const schema = new GraphQLSchema({
	name: "root",
	fields:{
		users:{
			type: new GraphQLList(userType)
		}
	}
})




var userRoot = {
	users: () => {
		return User.find()
	}
};


router.use("/", graphHTTP({
	schema: schema,
	rootValue: userRoot,
	graphql: true
}))


module.exports = router;