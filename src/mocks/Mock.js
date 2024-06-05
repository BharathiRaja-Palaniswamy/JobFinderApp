import { createServer, Model } from "miragejs";
import { v4 as uuidv4 } from "uuid";

export default function startMockServer() {
  createServer({
    models: {
      job: Model,
      application: Model,
    },
    routes() {
        // Mock GetJobs API Call
      this.get(
        "https://jobfinderapp.onrender.com/api/jobs/getJobs",
        (schema) => {
          const jobs = schema.db.jobs || [];
          
          const userApplications = schema?.db?.applications.where({
            userId: "User1",
          });
          // Filtering Applied JobIds
          const appliedJobIds = new Set(
            userApplications?.map((application) => application.JobId.toString())
          );

          const jobsWithApplicationStatus = jobs?.map((job) => ({
            ...job,
            applied: appliedJobIds?.has(job._id.toString()),
          }));
          return jobsWithApplicationStatus;
        }
      );
      // Mock Post Job API Call
      this.post(
        "https://jobfinderapp.onrender.com/api/jobs/postJob",
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          attrs._id = uuidv4();
          return schema.db.jobs.insert(attrs);
        }
      );
      // Mock Apply Job API Call
      this.post(
        "https://jobfinderapp.onrender.com/api/jobs/applyJob",
        (schema, request) => {
          let attrs = JSON.parse(request.requestBody);
          attrs._id = uuidv4();
          attrs.userId = "User1";
          return schema.db.applications.insert(attrs);
        }
      );
    },
  });
}
