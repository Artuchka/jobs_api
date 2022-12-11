const statusCodes = require("http-status-codes")
const jwt = require("jsonwebtoken")
const { CustomError } = require("../error/customError")

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
		req.user = decoded
	} catch (error) {
		throw new CustomError(statusCodes.UNAUTHORIZED, "bad token")
	}
	next()
}
module.exports = { authMiddleware }
