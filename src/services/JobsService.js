import config from '../constants/config'
const { GET_JOBS_API_ENDPOINT, POST_JOB_API_ENDPOINT, APPLY_JOB_API_ENDPOINT } = config;
/**
 * Retrieves the list of jobs from the server.
 * @returns {Promise<Array>} - A promise that resolves to an array of job objects.
 * @throws {Error} - Throws an error if there is a problem fetching the data.
 */
export const getJobs = async () => {
    try {
        const response = await fetch(GET_JOBS_API_ENDPOINT);
        const res = await response.json();
        return res;
    } catch (e) {
        console.log('Error occurred while fetching data', e);
    }
}

/**
 * Posts a new job to the server.
 * @param {Object} job - The job object to be posted.
 * @throws {Error} - Throws an error if there is a problem posting the job.
 */
export const postJob = async (job) => {
    try {
        const response = await fetch(POST_JOB_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(job)

        });
        if (!response.ok) {
            throw new Error('Failed to create Job', response);
        }
        const data = await response.json();
        if (data) {
            console.log('Job created:', data);
        }
        return data;
    } catch (e) {
        console.log('Error occurred while posting job', e);
        return e;
    }
}

/**
 * Applies for a job by submitting an application to the server.
 * @param {Object} application - The application object to be submitted.
 * @throws {Error} - Throws an error if there is a problem applying for the job.
 */
export const applyJob = async (application) => {
    try {
        const response = await fetch(APPLY_JOB_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(application)
        });
        if (!response.ok) {
            throw new Error('Failed to apply for Job', response);
        }

        const data = await response.json();
        if (data) {
            console.log('Job applied:', data);
        }
        return data;
    } catch (e) {
        console.log('Error occurred while applying for job', e);
    }
}



