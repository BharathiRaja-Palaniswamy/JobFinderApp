const JobApplyFSMConfig = {
    initial: 'workExperience',
    states: {
      workExperience: {
        displayText: 'Describe your work experience',
        validate: (input) => input.trim() !== '',
        on: {
          NEXT: 'education'
        }
      },
      education: {
        displayText: 'What is your highest level of education?',
        validate: (input) => input.trim() !== '',
        on: {
          PREV: 'workExperience',
          NEXT: 'skills'
        }
      },
      skills: {
        displayText: 'List your skills relevant to the job',
        validate: (input) => input.trim() !== '',
        on: {
          PREV: 'education',
          NEXT: 'submit'
        }
      },
      submit: {
        displayText: 'Review your application and submit',
        validate: () => true,
        on: {
          PREV: 'skills'
        }
      }
    }
  };
  
  export default JobApplyFSMConfig;
  