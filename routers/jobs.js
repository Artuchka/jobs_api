const express = require("express")
const { getJobs } = require("../controllers/jobs")
const { login } = require("../controllers/login")
const { authMiddleware } = require("../middleware/auth")
const router = express.Router()

router.route("/").get(authMiddleware, getJobs)

router.route("/login").post(login)

module.exports = { jobsRouter: router }
