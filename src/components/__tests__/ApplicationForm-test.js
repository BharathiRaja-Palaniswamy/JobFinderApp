import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ApplicationForm from "../ApplicationForm";
import { useConfig } from "../../contexts/ConfigContext";
import { postJob } from "../../services/JobsService";
import FSM from "../../fsm/FSM";
import EntryLevelJobAppFSMConfig from "../../fsm/EntrylevelJobApplyFSMConfig";
import JobApplyFSMConfig from "../../fsm/JobApplyFSMConfig";

jest.mock("../../contexts/ConfigContext");
jest.mock("../../services/JobsService");
jest.mock("../../fsm/FSM");

describe("ApplicationForm", () => {
  const mockUseConfig = (config) => {
    useConfig.mockReturnValue(config);
  };

  const defaultProps = {
    job: {
      JobTitle: "Software Engineer",
      CompanyName: "Tech Corp",
      ExperienceLevel: "entrylevel",
      _id: "job123",
    },
    onApplicationSubmitted: jest.fn(),
    closeModal: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Test to check if the form renders fine when FSM is enabled and selected job is entry level", () => {
    mockUseConfig({
      JOB_APPLICATION_FSM_ENABLED: true,
      TEMPERORY_USER_ID: "temp123",
      ENTRY_LEVEL_JOBS_FSM_KEYWORDS: [
        "junior",
        "entry level",
        "fresher",
        "intern",
        "entry level",
      ],
    });
    FSM.mockImplementation(() => ({
      config: EntryLevelJobAppFSMConfig,
      transition: jest.fn(),
    }));

    render(<ApplicationForm {...defaultProps} />);
    expect(
      screen.getByText(`Applying for Software Engineer at Tech Corp`)
    ).toBeInTheDocument();
  });

  test("Test to check if the form renders fine when FSM is enabled and selected job is non-entry level", () => {
    const props = {
      ...defaultProps,
      job: {
        ...defaultProps.job,
        ExperienceLevel: "entrylevel",
      },
    };

    mockUseConfig({
      JOB_APPLICATION_FSM_ENABLED: true,
      TEMPERORY_USER_ID: "temp123",
      ENTRY_LEVEL_JOBS_FSM_KEYWORDS: [
        "junior",
        "entry level",
        "fresher",
        "intern",
        "entry level",
      ],
    });
    FSM.mockImplementation(() => ({
      config: JobApplyFSMConfig,
      transition: jest.fn(),
    }));

    render(<ApplicationForm {...props} />);
    expect(
      screen.getByLabelText(
        JobApplyFSMConfig.states[JobApplyFSMConfig.initial].displayText
      )
    ).toBeInTheDocument();
  });

  test("Test to check form submission with FSM enabled", async () => {
    const fsm = {
      config: EntryLevelJobAppFSMConfig,
      transition: jest.fn(),
    };

    fsm.config.states = {
      [EntryLevelJobAppFSMConfig.initial]: {
        validate: jest.fn().mockReturnValue(true),
        on: {},
      },
    };
    fsm.config.initial = EntryLevelJobAppFSMConfig.initial;

    mockUseConfig({
      JOB_APPLICATION_FSM_ENABLED: true,
      TEMPERORY_USER_ID: "temp123",
      ENTRY_LEVEL_JOBS_FSM_KEYWORDS: [
        "junior",
        "entry level",
        "fresher",
        "intern",
        "entry level",
      ],
    });
    FSM.mockImplementation(() => fsm);

    render(<ApplicationForm {...defaultProps} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test input" },
    });

    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(defaultProps.onApplicationSubmitted).toHaveBeenCalled();
    });
  });

  test("Test to check form submission with FSM disabled", async () => {
    mockUseConfig({
      JOB_APPLICATION_FSM_ENABLED: false,
      TEMPERORY_USER_ID: "temp123",
      ENTRY_LEVEL_JOBS_FSM_KEYWORDS: ["Entry-Level"],
    });

    const mockSubmit = jest.fn(); // Mock the submit function

    render(
      <ApplicationForm {...defaultProps} onApplicationSubmitted={mockSubmit} />
    );

    fireEvent.change(
      screen.getByLabelText(/How many years of experience do you have?/),
      { target: { value: "5" } }
    );
    fireEvent.change(
      screen.getByLabelText(/Do you have any experience in managing team/),
      { target: { value: "Yes" } }
    );
    fireEvent.change(screen.getByLabelText(/Whats your current Location?/), {
      target: { value: "New York" },
    });
    fireEvent.change(screen.getByLabelText(/Are you willing to relocate/), {
      target: { value: "No" },
    });

    fireEvent.click(screen.getByText("Submit"));
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled();
    });
  });
});
