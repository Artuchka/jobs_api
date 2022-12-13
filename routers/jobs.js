const {
	getJobs,
	createJob,
	UpdateJob,
	getJob,
	deleteJob,
} = require("../controllers/jobs")
const express = require("express")
const router = express.Router()

router.route("/").get(getJobs).post(createJob)

router.route("/:jobId").patch(UpdateJob).get(getJob).delete(deleteJob)

module.exports = { jobsRouter: router }
