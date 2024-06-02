const DetailedjobPostFSMConfig = {
  initial: "CompanyName",
  states: {
    CompanyName: {
      displayText: "Please enter your company name",
      validate: (input) => input.trim() !== "",
      on: {
        NEXT: "JobTitle",
      },
    },
    JobTitle: {
      displayText: "Please enter the job title",
      validate: (input) => input.trim() !== "",
      on: {
        NEXT: "ExperienceLevel",
        PREV: "CompanyName",
      },
    },
    ExperienceLevel: {
      displayText: "Please select the experience level",
      validate: (input) => input.trim() !== "",
      on: {
        NEXT: "Salary",
        PREV: "JobTitle",
      },
    },
    Salary: {
      displayText: "Please enter the salary",
      validate: (input) => input.trim() !== "",
      on: {
        NEXT: "Location",
        PREV: "JobTitle",
      },
    },
    Location: {
      displayText: "Please enter the location",
      validate: (input) => input.trim() !== "",
      on: {
        NEXT: "Responsibilities",
        PREV: "Salary",
      },
    },
    Responsibilities: {
      displayText: "Please enter the responsibilities",
      validate: (input) => input.trim() !== "",
      on: {
        PREV: "Location",
      },
    },
  },
};

export default DetailedjobPostFSMConfig;
