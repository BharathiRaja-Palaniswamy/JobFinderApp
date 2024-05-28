import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FormComponent from '../../components/FormComponent'; 
import { postJob } from '../../services/JobsService'; 


jest.mock('../../services/JobsService', () => ({
  postJob: jest.fn(),
}));

describe('FormComponent', () => {
  describe('when useFSM is true', () => {
    test('handles FSM transitions correctly', async () => {
     
      const { getByText } = render(<FormComponent onJobsUpdated={jest.fn()} />);

     
      fireEvent.click(getByText('Next'));
      fireEvent.click(getByText('Prev'));

      
      expect(getByText('Transitioned to Next State: ...')).toBeInTheDocument(); 
      expect(getByText('Transitioned to Previous State: ...')).toBeInTheDocument(); 
    });
  });

  describe('when useFSM is false', () => {
    test('submits form data without FSM', async () => {
      const { getByLabelText, getByText } = render(<FormComponent onJobsUpdated={jest.fn()} />);

      fireEvent.change(getByLabelText('Company Name'), { target: { value: 'Test Company' } });
      fireEvent.change(getByLabelText('Job Title'), { target: { value: 'Test Job' } });
      fireEvent.change(getByLabelText('Experience Level'), { target: { value: 'Intermediate' } });
      fireEvent.change(getByLabelText('Salary'), { target: { value: '50000' } });

      fireEvent.submit(getByText('Submit'));

      await waitFor(() => {
        expect(postJob).toHaveBeenCalledWith({
          CompanyName: 'Test Company',
          JobTitle: 'Test Job',
          ExperienceLevel: 'Intermediate',
          Salary: '50000',
        });
      });
    });
  });

});
