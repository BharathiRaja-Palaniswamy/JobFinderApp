const quickPostFSMConfig = {
    initial: 'CompanyName',
    states: {
      CompanyName: {
        displayText: "Please enter your company name",
        validate: (input) => input.trim() !== '',
        on: {
          NEXT: 'JobTitle',
        },
      },
      JobTitle: {
        displayText: "Please enter the job position",
        validate: (input) => input.trim() !== '',
        on: {
          NEXT: 'Location',
          PREV: 'CompanyName',
        },
      },
      Location: {
        displayText: "Please enter the location",
        validate: (input) => input.trim() !== '',
        on: {
          NEXT: 'final',
          PREV: 'JobTitle',
        },
      },
      final: {
        displayText: "Review your details",
        validate: () => true,
        on: {},
      },
    }
  };
  
  export default quickPostFSMConfig;
  