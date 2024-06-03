const EntrylevelJobApplyFSMConfig = {
  initial: "internshipExperience",
  states: {
    internshipExperience: {
      displayText: "Do you have any internship experience?",
      validate: (input) => input.trim() !== "",
      on: {
        NEXT: "gpa",
      },
    },
    gpa: {
      displayText: "What is your GPA?",
      validate: (input) =>
        !isNaN(input) && parseFloat(input) >= 0 && parseFloat(input) <= 4,
      on: {
        PREV: "internshipExperience",
        NEXT: "portfolio",
      },
    },
    portfolio: {
      displayText: "Do you have a portfolio where we can view the projects you've worked on?",
      validate: (input) => input.trim() !== "",
      on: {
        PREV: "gpa",
        NEXT: "openness",
      },
    },
    openness: {
      displayText: "Are you open to learning new technologies and tools as required for the job?",
      validate: (input) => input.trim() !== "",
      on: {
        PREV: "portfolio",
      },
    },
  },
};

export default EntrylevelJobApplyFSMConfig;
