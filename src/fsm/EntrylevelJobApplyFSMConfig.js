const EntrylevelJobApplyFSMConfig = {
    initial: 'internshipExperience',
    states: {
      internshipExperience: {
        displayText: 'Do you have any internship experience?',
        validate: (input) => input.trim() !== '',
        on: {
          NEXT: 'gpa'
        }
      },
      gpa: {
        displayText: 'What is your GPA?',
        validate: (input) => !isNaN(input) && parseFloat(input) >= 0 && parseFloat(input) <= 4,
        on: {
          PREV: 'internshipExperience',
          NEXT: 'skills'
        }
      },
      skills: {
        displayText: 'List your skills relevant to the job',
        validate: (input) => input.trim() !== '',
        on: {
          PREV: 'gpa',
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
  
  export default EntrylevelJobApplyFSMConfig;
  