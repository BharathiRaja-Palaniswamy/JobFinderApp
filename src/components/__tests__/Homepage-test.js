import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Homepage from "../../components/Homepage";
import { getJobs } from "../../services/JobsService";
import { useConfig } from "../../contexts/ConfigContext";

jest.mock("../../contexts/ConfigContext");
jest.mock("../../components/ModalComponent", () => {
  return jest.fn(({ children }) => (
    <div data-testid="modal">
      Mock Modal
      {children}
    </div>
  ));
});

jest.mock("../../services/JobsService");

describe("Homepage", () => {
  const mockUseConfig = (config) => {
    useConfig.mockReturnValue(config);
  };
  const mockJobs = [
    {
      _id: "job1",
      JobTitle: "Software Engineer",
      CompanyName: "Tech Corp",
      Location: "New York",
      Salary: "$100,000",
      ExperienceLevel: "Mid-level",
      Responsibilities: "Develop software applications",
      applied: false,
    },
  ];
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockJobs),
    })
  );
  

 

  beforeEach(() => {
    getJobs.mockResolvedValue(mockJobs);
  });
 

  test("Test to check if call to get job list is triggering", async () => {
    mockUseConfig({ JOB_APPLICATION_FSM_ENABLED: true });
    render(<Homepage />);
    expect(getJobs).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(getJobs).toHaveBeenCalledTimes(1));
  });
  test("Test to check Homepage while jobs are fetching", () => {
    mockUseConfig({ JOB_APPLICATION_FSM_ENABLED: true });
    const { getByText, getByRole } = render(<Homepage />);
    expect(getByRole("navigation")).toBeInTheDocument();
    expect(getByText('Sorry No jobs available at this time. Please try again later')).toBeInTheDocument();
  });

  test("Test to check Homepage while jobs are fetched", async () => {
    mockUseConfig({ JOB_APPLICATION_FSM_ENABLED: true });
    const { getByText, getByRole } = render(<Homepage />);
    fetch();
        expect(getByRole("navigation")).toBeInTheDocument();
        await waitFor(() => expect(getByText(mockJobs[0].CompanyName)).toBeInTheDocument());
  });
  test("Test to check no jobs message when jobs doesnt exist", async () => {
    getJobs.mockResolvedValue([]);
    mockUseConfig({ JOB_APPLICATION_FSM_ENABLED: true });
    const { getByText, getByRole } = render(<Homepage />);
    fetch();
        expect(getByRole("navigation")).toBeInTheDocument();
        await waitFor(() => expect(getByText('Sorry No jobs available at this time. Please try again later')).toBeInTheDocument());
    
  });

});
