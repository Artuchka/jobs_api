const statusCodes = require("http-status-codes")
const jwt = require("jsonwebtoken")
const { CustomError } = require("../error/customError")
const { Users } = require("../schema/User")

const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization

	const BearerRegex = /Bearer /
	if (!authHeader || !authHeader.match(BearerRegex)) {
		throw new CustomError(statusCodes.UNAUTHORIZED, "bad token")
	}
	const token = authHeader.split(" ")[1]

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		console.log(decoded)
		const { mongoID } = decoded
		const foundUser = await Users.findOne({ _id: mongoID })
		if (!foundUser) {
			throw new CustomError(statusCodes.NOT_FOUND, "no such user found")
		}
		console.log(foundUser)
		req.user = foundUser
	} catch (error) {
		throw new CustomError(statusCodes.UNAUTHORIZED, "bad token")
	}
	next()
}
module.exports = { authMiddleware }
