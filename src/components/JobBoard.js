import React, { useState } from "react";
import ApplicationForm from "./ApplicationForm";
import ModalComponent from "./ModalComponent";
import { useConfig } from "../contexts/ConfigContext";

/**
 * JobBoard component displaying available jobs.
 * @param {Object} props - Component properties.
 * @param {Array} props.jobs - Array of jobs to display.
 * @param {Function} props.onApplied - Callback function called when a job is applied.
 * @returns {JSX.Element} - JSX element representing the job board component.
 */
const JobBoard = ({ jobs, onApplied }) => {
  console.log("jobboard rerendered");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { JOB_BOARD_HEADER_TEXT } = useConfig();

  /**
   * Handles the click event for applying to a job.
   * @param {Object} job - The selected job to apply for.
   */
  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  /**
   * Callback function called when the application form is submitted.
   * @param {Object} applicationData - Data submitted from the application form.
   */
  const handleApplicationSubmitted = async () => {
    try {
      onApplied();
    } catch (err) {}
  };

  return (
    <div className="JobBoard_Section">
      {jobs?.length ? (
        <>
          <ul className="JobBoard_Container">
            <h2 className="JobBoard_Header">{JOB_BOARD_HEADER_TEXT}</h2>
            {jobs.map((job) => (
              <li className="JobBoard_Container_Li" key={job._id}>
                <h3>{job.JobTitle}</h3>
                <div className="JobBoard_Container_Details_Section">
                  {job.CompanyName && (
                    <span className="JobBoard_Container_Span CompanyName">
                      {job.CompanyName}
                    </span>
                  )}
                  {job.JobLocation && (
                    <span className="JobBoard_Container_Span">
                      Location: {job.JobLocation}
                    </span>
                  )}
                  {job.Salary && (
                    <span className="JobBoard_Container_Span">
                      Pay Range: ${job.Salary}
                    </span>
                  )}
                  {job.ExperienceLevel && (
                    <span className="JobBoard_Container_Span">
                      Experience Level: {job.ExperienceLevel}
                    </span>
                  )}
                </div>

                {job.applied ? (
                  <span className="JobBoard_Container_Applied"> Applied</span>
                ) : (
                  <button
                    className="JobBoard_Container_Apply"
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply
                  </button>
                )}
              </li>
            ))}
          </ul>

          {selectedJob && (
            <ModalComponent
              data-testid="modal"
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
            >
              <ApplicationForm
                job={selectedJob}
                onApplicationSubmitted={handleApplicationSubmitted}
              />
            </ModalComponent>
          )}
        </>
      ) : (
        <h4>Sorry No jobs available at this time. Please try again later.</h4>
      )}
    </div>
  );
};

export default JobBoard;
