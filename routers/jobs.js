const { getJobs } = require("../controllers/jobs")
const { authMiddleware } = require("../middleware/auth")
const express = require("express")
const router = express.Router()

router.route("/").get(authMiddleware, getJobs)

module.exports = { jobsRouter: router }
