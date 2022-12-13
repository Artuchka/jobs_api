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
		const { userId } = jwt.verify(token, process.env.JWT_SECRET)
		// we may find user in database also
		req.user = { userId }
	} catch (error) {
		throw new CustomError(statusCodes.UNAUTHORIZED, "bad token")
	}
	next()
}
module.exports = { authMiddleware }
