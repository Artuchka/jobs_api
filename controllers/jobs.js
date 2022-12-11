const getJobs = async (req, res) => {
	const { id, username } = req.user
	res.json({
		success: true,
		msg: "main workd",
		id,
		username,
	})
}

module.exports = { getJobs }
