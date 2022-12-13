const { StatusCodes } = require("http-status-codes")
const { default: mongoose } = require("mongoose")
const { CustomError } = require("../error/customError")

const MongooseErrorMap = {
	ValidationError: StatusCodes.UNPROCESSABLE_ENTITY,
	CastError: StatusCodes.BAD_REQUEST,
}

const errorMiddleware = async (err, req, res, next) => {
	if (err instanceof CustomError) {
		return res.status(err.code).json({
			success: false,
			msg: err.message,
		})
	}
	if (
		err instanceof mongoose.Error.ValidationError ||
		err instanceof mongoose.Error.CastError
	) {
		return res.status(MongooseErrorMap[err.name]).json({
			success: false,
			msg: err.message,
			err: err,
		})
	}

	res.status(404).json({
		msg: err.message,
		err,
	})
}
module.exports = { errorMiddleware }
