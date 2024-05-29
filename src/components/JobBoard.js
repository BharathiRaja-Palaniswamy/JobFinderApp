import React, { useState } from 'react';
import { getJobs, applyJob } from '../services/JobsService';
import ApplicationForm from './ApplicationForm';
import ModalComponent from './ModalComponent';

const JobBoard = ({ jobs, onApplied }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleApplicationSubmitted = async (applicationData) => {
    
    await applyJob(applicationData);
    console.log('Application Submitted:', applicationData);
    setIsModalOpen(false);
    onApplied();
  };

  return (
    <>
      <h2>Job Listings</h2>
      {jobs.length ?
      <ul className="JobBoard_Container">
        {jobs.map(job => (
          <li className="JobBoard_Container_Li" key={job._id}>
            <h3>{job.JobTitle}</h3>
            <div className='JobBoard_Container_Details_Section'>
            <span className='JobBoard_Container_Span'> {job.CompanyName}</span>
            <span className='JobBoard_Container_Span'> Location: {job.Location}</span>
            <span className='JobBoard_Container_Span'>Pay Range :${job.Salary}</span>
            <span className='JobBoard_Container_Span'>Experience Level: {job.ExperienceLevel}</span>
            <span className='JobBoard_Container_Span'> Primary Skills:{job.Responsibilities}</span>

            </div>
            
           {job.applied ? <span className='JobBoard_Container_Applied'> Applied</span> :<button className='JobBoard_Container_Apply' onClick={() => handleApplyClick(job)}>Apply</button>}
          </li>
        ))}
      </ul> : <h4>Sorry No jobs available. Please check later.</h4>}
      {selectedJob && (
        <ModalComponent data-testid='modal' isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <ApplicationForm
            job={selectedJob}
            onApplicationSubmitted={handleApplicationSubmitted}
            closeModal={() => setIsModalOpen(false)}
          />
        </ModalComponent>
      )}
    </>
  );
};

export default JobBoard;
