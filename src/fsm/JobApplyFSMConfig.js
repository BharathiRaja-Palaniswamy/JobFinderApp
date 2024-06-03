const JobApplyFSMConfig = {
  initial: "workExperience",
  states: {
    workExperience: {
      displayText:
        "How many years of Engineering experience do you currently have?",
      validate: (input) => input.trim() !== "",
      on: {
        NEXT: "architectExperience",
      },
    },
    architectExperience: {
      displayText:
        "How many years of experience do you have in software architecture design, distributed systems, data management? ",
      validate: (input) => input.trim() !== "",
      on: {
        PREV: "workExperience",
        NEXT: "management",
      },
    },
    management: {
      displayText: "Do you have any Team management experience?",
      validate: (input) => input.trim() !== "",
      on: {
        PREV: "architectExperience",
        NEXT: "skills",
      },
    },
    skills: {
      displayText:
        "Do you have any professional experience on building native mobile app?",
      validate: (input) => input.trim() !== "",
      on: {
        PREV: "management",
      },
    },
  },
};

export default JobApplyFSMConfig;
