import React, {useState, useEffect} from 'react';
import {getJobs} from '../services/JobsService';
import Navbar from './Navbar';
import JobBoard from './JobBoard';
import FormComponent from './FormComponent';
import ModalComponent from './ModalComponent';


const Homepage = () => {
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchJobs = async () => {

        const data = await getJobs();
        setJobs(data);
        console.log('jobs', data);

    }
    const PostJobClicked = () => {
        setIsModalOpen(true);
    }
    const onJobsUpdated = () => {
        setIsModalOpen(false);
        fetchJobs();
    };
    
    const onJobApplied = () => {
        fetchJobs();
    };
    useEffect(() => {
        fetchJobs();
    }, [])
    return (
        <div>
            <Navbar PostJobClicked={PostJobClicked} />
            {jobs && <JobBoard  jobs={jobs} onApplied= {onJobApplied}/>}
            <ModalComponent isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
            <FormComponent onJobsUpdated= {onJobsUpdated} />
            </ModalComponent>
        </div>
    );
};

export default Homepage;
