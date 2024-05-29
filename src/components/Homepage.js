import React, { useState, useEffect } from 'react';
import { getJobs } from '../services/JobsService';
import Navbar from './Navbar';
import JobBoard from './JobBoard';
import FormComponent from './FormComponent';
import ModalComponent from './ModalComponent';

/**
 * Homepage component displaying job board and job posting form.
 * @returns {JSX.Element} - JSX element representing the homepage component.
 */
const Homepage = () => {
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * Fetches jobs from the server.
     */
    const fetchJobs = async () => {
        const data = await getJobs();
        setJobs(data);
        console.log('jobs', data);
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
        setIsModalOpen(false);
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
            {jobs && <JobBoard jobs={jobs} onApplied={onJobApplied} />}
            <ModalComponent isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <FormComponent onJobsUpdated={onJobsUpdated} />
            </ModalComponent>
        </div>
    );
};

export default Homepage;
