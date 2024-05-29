import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormComponent from '../../components/FormComponent';
import { postJob } from '../../services/JobsService';

jest.mock('../../services/JobsService');
jest.mock('../../contexts/ConfigContext', () => ({
  useConfig: () => ({
    JOB_POST_FSM_ENABLED: false, 
  }),
}));

describe('FormComponent', () => {
  test('Test to check Initial state rendering', () => {
    const { getByText, getByLabelText } = render(<FormComponent />);
    expect(getByText('Post a Job')).toBeInTheDocument();
    expect(getByLabelText('Company Name')).toBeInTheDocument();
    expect(getByLabelText('Job Title')).toBeInTheDocument();
    expect(getByLabelText('Experience Level')).toBeInTheDocument();
    expect(getByLabelText('Salary')).toBeInTheDocument();
  });

  test('Test to check form submission with FSM Disabled', async () => {
    const onJobsUpdated = jest.fn();
    const { getByText, getByLabelText } = render(<FormComponent onJobsUpdated={onJobsUpdated} />);
    fireEvent.change(getByLabelText('Company Name'), { target: { value: 'Tech Corp' } });
    fireEvent.change(getByLabelText('Job Title'), { target: { value: 'Software Engineer' } });
    fireEvent.change(getByLabelText('Experience Level'), { target: { value: 'Mid-level' } });
    fireEvent.change(getByLabelText('Salary'), { target: { value: '$100,000' } });
    fireEvent.submit(getByText('Submit'));
    await waitFor(() => {
      expect(postJob).toHaveBeenCalledWith({
        CompanyName: 'Tech Corp',
        JobTitle: 'Software Engineer',
        ExperienceLevel: 'Mid-level',
        Salary: '$100,000',
      });
      expect(onJobsUpdated).toHaveBeenCalledTimes(1);
    });
  });

  
  
});
