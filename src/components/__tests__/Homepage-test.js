import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Homepage from '../../components/Homepage';
import { getJobs } from '../../services/JobsService';

jest.mock('../../components/ModalComponent', () => {
  return jest.fn(({ children }) => (
    <div data-testid="modal">
      Mock Modal
      {children}
    </div>
  ));
});

jest.mock('../../services/JobsService');

describe('Homepage', () => {
  const mockJobs = [
    {
      _id: 'job1',
      JobTitle: 'Software Engineer',
      CompanyName: 'Tech Corp',
      Location: 'New York',
      Salary: '$100,000',
      ExperienceLevel: 'Mid-level',
      Responsibilities: 'Develop software applications',
      applied: false,
    }
  ];

  beforeEach(() => {
    getJobs.mockResolvedValue(mockJobs);
  });

  test('Test to check Homepage child elemented are rendering', () => {
    const { getByText,getByRole } = render(<Homepage />);
    expect(getByRole('navigation')).toBeInTheDocument();
    expect(getByText('Job Listings')).toBeInTheDocument();
  });

  test('Test to check Call to get job list is triggering', async () => {
    render(<Homepage />);
    expect(getJobs).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(getJobs).toHaveBeenCalledTimes(1));
  });

 
});
