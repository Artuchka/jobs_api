const jwt = require("jsonwebtoken")

const getToken = async (userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	})
	return token
}

module.exports = { getToken }
