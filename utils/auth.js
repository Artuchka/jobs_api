const jwt = require("jsonwebtoken")

const getToken = async (mongoID) => {
	const token = jwt.sign({ mongoID }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	})
	return token
}

module.exports = { getToken }
