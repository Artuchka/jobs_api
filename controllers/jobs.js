const { StatusCodes } = require("http-status-codes")
const { CustomError } = require("../error/customError")
const { Jobs } = require("../schema/Job")

const getJobs = async (req, res) => {
	const { userId } = req.user

	const foundJobs = await Jobs.find({
		createdByUserId: userId,
	})
	console.log(foundJobs)

	res.status(StatusCodes.OK).json({
		success: true,
		msg: "here are your jobs, dear!",
		foundJobs,
	})
}

const createJob = async (req, res) => {
	const { userId } = req.user
	const { position, company } = req.body

	const userJob = await Jobs.create({
		position,
		company,
		createdByUserId: userId,
	})
	console.log(userJob)

	res.status(StatusCodes.CREATED).json({
		success: true,
		userJob,
	})
}

const UpdateJob = async (req, res) => {
	const { userId } = req.user
	const { jobId } = req.params
	const { position, company } = req.body

	const foundJob = await Jobs.findOne({ _id: jobId })
	if (!foundJob) {
		throw new CustomError(
			StatusCodes.NOT_FOUND,
			"cant find a job with such id = " + jobId
		)
	}

	if (foundJob.createdByUserId.toString() !== userId) {
		throw new CustomError(
			StatusCodes.UNAUTHORIZED,
			"Access denied for you for job with id = " + jobId
		)
	}

	const updatedJobInfo = {}
	console.log({ position, company })
	if (position) {
		updatedJobInfo.position = position
		console.log("yes")
	}
	if (company) {
		updatedJobInfo.company = company
		console.log("yes")
	}

	const updatedJob = await Jobs.findOneAndUpdate(
		{ _id: jobId },
		{ ...updatedJobInfo },
		{ new: true, runValidators: true }
	)

	console.log(updatedJob)
	res.status(StatusCodes.OK).json({
		success: true,
		msg: "updated the job, dear!",
		updatedJob,
	})
}
const getJob = async (req, res) => {
	const { userId } = req.user
	const { jobId } = req.params

	const foundJob = await Jobs.findOne({ _id: jobId })
	if (!foundJob) {
		throw new CustomError(
			StatusCodes.NOT_FOUND,
			"cant find a job with such id = " + jobId
		)
	}

	if (foundJob.createdByUserId.toString() !== userId) {
		throw new CustomError(
			StatusCodes.UNAUTHORIZED,
			"Access denied for you for job with id = " + jobId
		)
	}

	res.status(StatusCodes.OK).json({
		success: true,
		msg: "found the job, dear!",
		foundJob,
	})
}

const deleteJob = async (req, res) => {
	const { userId } = req.user
	const { jobId } = req.params

	const foundJob = await Jobs.findOne({ _id: jobId })
	if (!foundJob) {
		throw new CustomError(
			StatusCodes.NOT_FOUND,
			"cant find a job with such id = " + jobId
		)
	}

	if (foundJob.createdByUserId.toString() !== userId) {
		throw new CustomError(
			StatusCodes.UNAUTHORIZED,
			"Access denied for you for job with id = " + jobId
		)
	}

	const deletedJob = await Jobs.deleteOne({ _id: jobId }, { new: true })

	res.status(StatusCodes.OK).json({
		success: true,
		msg: "deleted the job, dear!",
		deletedJob,
	})
}

module.exports = { getJob, getJobs, createJob, UpdateJob, deleteJob }
