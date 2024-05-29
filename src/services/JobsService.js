import config from '../constants/config'
const {GET_JOBS_API_ENDPOINT,POST_JOB_API_ENDPOINT,APPLY_JOB_API_ENDPOINT} = config;
export const getJobs = async () => {
    try {
        const response = await fetch(GET_JOBS_API_ENDPOINT);
        const res = await response.json();
        return res;
    } catch (e) {
        console.log('Error occured while fetching data', e);
    }
}
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
      
            console.log('job created:', data);
          }
        
    } catch (e) {
        console.log('Error occured while fetching data', e);
    }
}

export const applyJob = async(application) => {
    try {
        const response = await fetch(APPLY_JOB_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(application)

        });
        if (!response.ok) {
            throw new Error('Failed to apply Job', response);
          }
      
          const data = await response.json();
          if (data) {
      
            console.log('job applied:', data);
          }
        
    } catch (e) {
        console.log('Error occured while applying for job', e);
    }
    
}


