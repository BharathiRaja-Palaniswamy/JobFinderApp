import React from 'react';
import { render, fireEvent, waitFor, getAllByText, getAllByRole } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JobBoard from '../../components/JobBoard';


jest.mock('../../services/JobsService', () => ({
  getJobs: jest.fn().mockResolvedValue([]),
  applyJob: jest.fn().mockResolvedValue(),
}));


jest.mock('../../components/ApplicationForm', () => {
  
  return () => <div data-testid="application-form">Mock Application Form</div>;
});
jest.mock('../../components/ModalComponent', () => {
  
  return () => <div data-testid="modal"><div data-testid="application-form">Mock Application Form</div></div>;
});


describe('JobBoard', () => {
  const jobs = [
    {
      _id: 'job1',
      JobTitle: 'Software Engineer',
      CompanyName: 'Tech Corp',
      Location: 'New York',
      Salary: '$100,000',
      ExperienceLevel: 'Mid-level',
      Responsibilities: 'Develop software applications',
      applied: false,
    },
  ];

  test('Test to check job list rendering fine when jobs exist', () => {
    const { getByText } = render(<JobBoard jobs={jobs} />);
    expect(getByText('Job Listings')).toBeInTheDocument();
    expect(getByText('Software Engineer')).toBeInTheDocument();
  });

  test('Test to check no jobs message when jobs doesnt exist', () => {
    const { getByText } = render(<JobBoard jobs={[]} />);
    expect(getByText('Sorry No jobs available. Please check later.')).toBeInTheDocument();
  });

  test('Test to check open modal functionality', () => {
    const { getByText, getByTestId } = render(<JobBoard jobs={jobs} />);
    screen.debug
    fireEvent.click(getByText('Apply'));
    expect(getByTestId('modal')).toBeInTheDocument();
    expect(getByTestId('application-form')).toBeInTheDocument();
  });

  test('Test to check if appropriate job is picked on click of apply buttonx', () => {
    const jobs = [
      {
        _id: 'job1',
        JobTitle: 'Software Engineer',
        CompanyName: 'Tech Corp',
        Location: 'New York',
        Salary: '$100,000',
        ExperienceLevel: 'Mid-level',
        Responsibilities: 'Develop software applications',
        applied: false,
      },
      {
        _id: 'job2',
        JobTitle: 'Mechanical Engineer',
        CompanyName: 'Tech Corp',
        Location: 'New York',
        Salary: '$100,000',
        ExperienceLevel: 'Mid-level',
        Responsibilities: 'Develop software applications',
        applied: false,
      }];
    const { getByText, getAllByRole } = render(<JobBoard jobs={jobs} />);
    const applyButtons = getAllByRole('button', { name: 'Apply' });
    fireEvent.click(applyButtons[1]);
    expect(getByText('Mechanical Engineer')).toBeInTheDocument();
  });

});
