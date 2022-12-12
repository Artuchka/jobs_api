const mongoose = require("mongoose")

const JobSchema = mongoose.Schema({
	position: {
		type: String,
		required: [true, "please provide position"],
		maxlength: [50, "position is up to 50 characters"],
	},
	company: {
		type: String,
		required: [true, "please provide company"],
		maxlength: [100, "position is up to 100 characters"],
	},
	createdByUserId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, "please provide user id who created this job"],
	},
})

const Jobs = mongoose.model("Job", JobSchema)

module.exports = { Jobs }
