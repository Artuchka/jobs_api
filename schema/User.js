const mongoose = require("mongoose")
var bcrypt = require("bcryptjs")
const { getToken } = require("../utils/auth")

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "please provide username"],
		maxlength: [20, "please shorten your username up to 20 characters"],
		trim: true,
		default: "username",
	},
	email: {
		unique: true,
		type: String,
		required: [true, "please provide email"],
		match: [
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			"must match email pattern",
		],
	},
	name: {
		type: String,
		required: [true, "please provide name"],
		maxlength: [20, "please shorten your username up to 20 characters"],
		trim: true,
		default: "name",
	},
	password: {
		type: String,
		required: [true, "please provide password"],
		minlength: [5, "please increase your password up to 5 characters"],
		default: "123456",
	},
})

UserSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt(10)
	const hashedPass = await bcrypt.hash(this.password, salt)
	this.password = hashedPass.toString()
	next()
})

UserSchema.methods.getToken = function () {
	return getToken(this._id)
}

UserSchema.methods.checkPassword = async function (pass) {
	return await bcrypt.compare(pass, this.password)
}

const Users = mongoose.model("User", UserSchema)

module.exports = { Users }
