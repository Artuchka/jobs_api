const cors = require("cors")
const xss = require("xss-clean")
const helmet = require("helmet")
const rateLimiter = require("express-rate-limit")

const express = require("express")
require("express-async-errors")
const { connectDB } = require("./database/connect")
const { authMiddleware } = require("./middleware/auth")
const { errorMiddleware } = require("./middleware/error-handler")
const { notFoundMiddleware } = require("./middleware/notFound")
const { authRouter } = require("./routers/auth")
const { jobsRouter } = require("./routers/jobs")
require("dotenv").config()
require("express-async-errors")

const app = express()
const port = process.env.PORT || 5400

app.set("trust proxy", 1)
app.use(
	rateLimiter({
		windowMs: 5 * 60 * 1000,
		max: 100,
	})
)
app.use(cors())
app.use(xss())
app.use(helmet())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/jobs/auth", authRouter)
app.use("/api/jobs", authMiddleware, jobsRouter)

app.use(errorMiddleware)
app.use(notFoundMiddleware)

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		console.log("connected")
		app.listen(port, () => {
			console.log(`listening on port=${port}`)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
