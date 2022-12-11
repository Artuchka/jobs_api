const { CustomError } = require("../error/customError")

const errorMiddleware = async (err, req, res, next) => {
	if (err instanceof CustomError) {
		res.status(err.code).json({
			success: false,
			msg: err.message,
		})
	}
	res.status(404).json({
		msg: "no such route",
	})
}
module.exports = { errorMiddleware }
