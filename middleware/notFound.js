const notFoundMiddleware = async (req, res, next) => {
	res.status(404).json({
		msg: "no such route",
	})
}

module.exports = { notFoundMiddleware }
