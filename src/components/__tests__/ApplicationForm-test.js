import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ApplicationForm from '../../components/ApplicationForm';

describe('ApplicationForm Component', () => {
    const mockJob = {"_id":{"$oid":"665525ca3be3530fcc471583"},"CompanyName":"Cognizant","JobTitle":"Senior Software Engineer","ExperienceLevel":"entrylevel","Salary":"250000","Location":"San jose","Responsibilities":"Front end","__v":{"$numberInt":"0"}};
  test('renders without crashing', () => {
    render(<ApplicationForm job={mockJob} />);
  });

  test('displays form elements when FSM is enabled', () => {
    render(<ApplicationForm job={mockJob} />);
    const companyNameInput = screen.getByLabelText('Company Name');
    const jobTitleInput = screen.getByLabelText('Job Title');
    const experienceLevelInput = screen.getByLabelText('Experience Level');
    const salaryInput = screen.getByLabelText('Salary');
    const submitButton = screen.getByText('Submit');

    expect(companyNameInput).toBeInTheDocument();
    expect(jobTitleInput).toBeInTheDocument();
    expect(experienceLevelInput).toBeInTheDocument();
    expect(salaryInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('displays current state text when FSM is enabled', () => {
    render(<ApplicationForm job={mockJob} />);
    const currentStateText = screen.getByText('Current State Text');
    expect(currentStateText).toBeInTheDocument();
  });

  test('navigates to next state when Next button is clicked', () => {
    render(<ApplicationForm job={mockJob} />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    const updatedStateText = screen.getByText('Updated State Text');
    expect(updatedStateText).toBeInTheDocument();
  });

  // Add more test cases as needed
});
