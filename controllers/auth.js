const { StatusCodes, INTERNAL_SERVER_ERROR } = require("http-status-codes")
const { CustomError } = require("../error/customError")
const { Users } = require("../schema/User")
const { getToken } = require("../utils/auth")

const register = async (req, res) => {
	const { username, password, email } = req.body

	const createdUser = await Users.create({
		username,
		password,
		email,
	})

	const token = await createdUser.getToken()
	res.status(StatusCodes.CREATED).json({
		success: true,
		msg: "registered",
		user: { email, username },
		token,
	})
}

const login = async (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		throw new CustomError(
			StatusCodes.NOT_ACCEPTABLE,
			"please provide username and password"
		)
	}

	const foundUser = Users.findOne({ username })
	if (!foundUser) {
		throw new CustomError(StatusCodes.UNAUTHORIZED, "invalid credentials")
	}

	const isCredentialsMatch = foundUser.checkPassword(password)
	if (!isCredentialsMatch) {
		throw new CustomError(StatusCodes.UNAUTHORIZED, "invalid credentials")
	}

	res.status(StatusCodes.OK).json({
		msg: "welcome back!",
	})
}

module.exports = { login, register }
