import React, { useState, useEffect } from "react";
import { getJobs } from "../services/JobsService";
import Navbar from "./Navbar";
import JobBoard from "./JobBoard";
import FormComponent from "./FormComponent";
import ModalComponent from "./ModalComponent";
import { useConfig } from "../contexts/ConfigContext";

/**
 * Homepage component displaying job board and job posting form.
 * @returns {JSX.Element} - JSX element representing the homepage component.
 */
const Homepage = () => {
  const { JOB_APPLICATION_FSM_ENABLED } = useConfig();
  const [jobs, setJobs] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Fetches jobs from the server.
   */
  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
      console.log("jobs", data);
    } catch (err) {
      console.log("Error occured while fetching data", err);
    }
  };

  /**
   * Post Job Click event handler
   */
  const PostJobClicked = () => {
    setIsModalOpen(true);
  };

  /**
   * Callback function to update parent once job is posted
   */
  const onJobsUpdated = () => {
    fetchJobs();
  };

  /**
   * Callback function called when a job is applied.
   */
  const onJobApplied = () => {
    fetchJobs();
  };

  /**
   * Fetch job list on initial rendering
   */
  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div>
      <Navbar PostJobClicked={PostJobClicked} />
      <div className="Homepage_Body">
        { jobs ? (
          <JobBoard jobs={jobs} onApplied={onJobApplied} />
        ) : (
          <h4>Jobs are loading. Please wait...</h4>
        )}
        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          <FormComponent onJobsUpdated={onJobsUpdated} />
        </ModalComponent>
      </div>
      <div className="Homepage_Footer">
        {JOB_APPLICATION_FSM_ENABLED ? (
          <span className="Homepage_Footer_Message">
            <span className="Homepage_Footer_Message_Caption">Note: </span>Currently
            FSM feature is enabled. You can notice questions asked in job
            applications are more relevant to the job's experience level.
          </span>
        ) : (
          <span className="Homepage_Footer_Message">
            <span className="Homepage_Footer_Message_Caption">Note: </span> Currently
            FSM feature is disabled. You can notice job applications having
            generic questions irrespective of experience level.
          </span>
        )}
      </div>
    </div>
  );
};

export default Homepage;
