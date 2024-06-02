import React, { useState } from 'react';
import { getJobs, applyJob } from '../services/JobsService';
import ApplicationForm from './ApplicationForm';
import ModalComponent from './ModalComponent';

/**
 * JobBoard component displaying available jobs.
 * @param {Object} props - Component properties.
 * @param {Array} props.jobs - Array of jobs to display.
 * @param {Function} props.onApplied - Callback function called when a job is applied.
 * @returns {JSX.Element} - JSX element representing the job board component.
 */
const JobBoard = ({ jobs, onApplied }) => {
  console.log('jobboard rerendered');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    } catch (err) {

    }
  };


  return (
    <>
      <div className='JobBoard_Section'>
       
       
          <ul className="JobBoard_Container">
             <h2 className='JobBoard_Header'>Discover Jobs</h2>
            {jobs.map(job => (
              <li className="JobBoard_Container_Li" key={job._id}>
                <h3>{job.JobTitle}</h3>
                <div className='JobBoard_Container_Details_Section'>
                  {job.CompanyName && <span className='JobBoard_Container_Span'> {job.CompanyName}</span>}
                  {job.Location && <span className='JobBoard_Container_Span'> Location: {job.Location}</span>}
                  {job.Salary && <span className='JobBoard_Container_Span'>Pay Range: ${job.Salary}</span>}
                  {job.ExperienceLevel && <span className='JobBoard_Container_Span'>Experience Level: {job.ExperienceLevel}</span>}
                  {job.Responsibilities && <span className='JobBoard_Container_Span'> Primary Skills: {job.Responsibilities}</span>}

                </div>

                {job.applied ? <span className='JobBoard_Container_Applied'> Applied</span> : <button className='JobBoard_Container_Apply' onClick={() => handleApplyClick(job)}>Apply</button>}
              </li>
            ))}
          </ul> 
          
        {selectedJob && (
          <ModalComponent data-testid='modal' isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <ApplicationForm
              job={selectedJob}
              onApplicationSubmitted={handleApplicationSubmitted}
            
            />
          </ModalComponent>
        )}
      </div>
    </>
  );
};

export default JobBoard;
