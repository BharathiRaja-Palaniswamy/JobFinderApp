import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import JobBoard from '../../components/JobBoard';

describe('JobBoard', () => {
  it('renders job listings correctly', () => {
    const mockJobs = [
      {
        _id: '1',
        JobTitle: 'Software Engineer',
        CompanyName: 'Test Company',
        Location: 'Test Location',
        Salary: '$100,000',
        ExperienceLevel: 'Entry Level',
        Responsibilities: 'Test Responsibilities',
        applied: false
      },
      // Add more mock job objects as needed
    ];

    const { getByText, getByTestId } = render(<JobBoard jobs={mockJobs} />);

    // Check if the job listings are rendered
    mockJobs.forEach(job => {
      expect(getByText(job.JobTitle)).toBeInTheDocument();
      expect(getByText(job.CompanyName)).toBeInTheDocument();
      expect(getByText(job.Location)).toBeInTheDocument();
      expect(getByText(`Pay up to: ${job.Salary}`)).toBeInTheDocument();
      expect(getByText(`Experience: ${job.ExperienceLevel}`)).toBeInTheDocument();
      expect(getByText(job.Responsibilities)).toBeInTheDocument();

      const applyButton = getByText('Apply');
      expect(applyButton).toBeInTheDocument();

      // Simulate clicking the Apply button
      fireEvent.click(applyButton);
      expect(getByTestId('modal')).toBeInTheDocument();
    });
  });
});
