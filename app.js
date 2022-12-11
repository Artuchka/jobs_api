const express = require("express")
require("express-async-errors")
const { connectDB } = require("./database/connect")
const { errorMiddleware } = require("./middleware/error-handler")
const { notFoundMiddleware } = require("./middleware/notFound")
const { jobsRouter } = require("./routers/jobs")
require("dotenv").config()
require("express-async-errors")

const app = express()
const port = process.env.PORT || 5400

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/jobs", jobsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

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
