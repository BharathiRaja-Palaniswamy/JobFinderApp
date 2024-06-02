const Job = require("../models/Job");
const Application = require("../models/Application");

exports.addJob = async (req, res) => {
  const { title, priority, dueDate } = req.body;
  try {
    const newJob = new Job(req.body);
    const jobResponse = await newJob.save();
    res.json(jobResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getJobs = async (req, res) => {
  try {
    const userId = "User1";

    const jobs = await Job.find({}).lean().sort({"createdAt": -1});
    // Job Applications from Specific User
    const userApplications = await Application.find({ userId }).lean();
    // Filtering Applied JobIds
    const appliedJobIds = new Set(
      userApplications.map((application) => application.JobId.toString())
    );

    const jobsWithApplicationStatus = jobs.map((job) => ({
      ...job,
      applied: appliedJobIds.has(job._id.toString()),
    }));

    res.json(jobsWithApplicationStatus);
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.applyJob = async (req, res) => {
  try {
    const { id } = req.params;
    const newApplication = new Application(req.body);
    const ApplicationResponse = await newApplication.save();
    res.json(ApplicationResponse);
  } catch (e) {
    console.log("error while updating", e.message);
  }
};
