const JobApplyFSMConfig = {
  initial: "workExperience",
  states: {
    workExperience: {
      displayText:
        "How many years of experience you have as a senior engineer ?",
      validate: (input) => input.trim() !== "",
      on: {
        NEXT: "education",
      },
    },
    education: {
      displayText: "What is your highest level of education ?",
      validate: (input) => input.trim() !== "",
      on: {
        PREV: "workExperience",
        NEXT: "skills",
      },
    },
    skills: {
      displayText: "What relevant skills you have for this job ?",
      validate: (input) => input.trim() !== "",
      on: {
        PREV: "education",
      },
    },
  },
};

export default JobApplyFSMConfig;
