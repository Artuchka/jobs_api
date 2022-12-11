const { CustomError } = require("../error/customError")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
	console.log("LOGIN")
	console.log(req.body)
	const { username } = req.body
	const id = new Date().getTime()
	try {
		const token = jwt.sign({ username, id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		})
		res.json({
			success: true,
			msg: "main workd",
			token,
		})
	} catch (error) {
		console.log(error)
		throw new CustomError(500, "lol")
	}
}

module.exports = { login }
