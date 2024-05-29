import React, { useState, useEffect } from 'react';
import EntryLevelJobAppFSMConfig from '../fsm/EntrylevelJobApplyFSMConfig';
import JobApplyFSMConfig from '../fsm/JobApplyFSMConfig';
import FSM from '../fsm/FSM';
import { useConfig } from '../contexts/ConfigContext';

/**
 * Represents the application form component for job application.
 * @param {object} props - The props object.
 * @param {object} props.job - The job object for which the application is being submitted.
 * @param {Function} props.onApplicationSubmitted - The function to call when the application is submitted.
 * @param {Function} props.closeModal - The function to close the modal after submission.
 * @returns {JSX.Element} - The JSX element representing the application form.
 */
const ApplicationForm = ({ job, onApplicationSubmitted, closeModal }) => {
  // using constants from useConfig Hook
  const { JOB_APPLICATION_FSM_ENABLED, TEMPERORY_USER_ID,ENTRY_LEVEL_JOBS_FSM_KEYWORDS } = useConfig();

  // Component State variables 
  const [fsm, setFSM] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const jobExperienceLevel = job.ExperienceLevel;

  // Hook to set FSM path based on the selected Job's Experience level
  useEffect(() => {
    let newFSM;
    if (JOB_APPLICATION_FSM_ENABLED) {
      if (ENTRY_LEVEL_JOBS_FSM_KEYWORDS.includes(jobExperienceLevel.toLowerCase())) {
        newFSM = new FSM(EntryLevelJobAppFSMConfig);
      } else {
        newFSM = new FSM(JobApplyFSMConfig);
      }
      setFSM(newFSM);
      setCurrentState(newFSM.config.initial);
    }
  }, [jobExperienceLevel]);

  // Next state Handler for FSM
  const handleNext = () => {
    if (fsm.config.states[currentState].validate(formData[currentState] || '')) {
      const nextState = fsm.transition('NEXT');
      setCurrentState(nextState);
    } else {
      alert('Please provide valid input');
    }
  };

  // Prev state Handler for FSM
  const handlePrev = () => {
    const prevState = fsm.transition('PREV');
    setCurrentState(prevState);
  };

  // Application form submit handler
  const handleSubmit = async (JobId) => {
    try {
      if (!JOB_APPLICATION_FSM_ENABLED) {
        if (await validate()) {
          formData.JobId = JobId;
          formData.userId = TEMPERORY_USER_ID;
          await onApplicationSubmitted(formData);
        }
      } else {
        if (fsm.config.states[currentState].validate(formData[currentState] || '')) {
          formData.JobId = JobId;
          formData.userId = TEMPERORY_USER_ID;
          await onApplicationSubmitted(formData);
        } else {
          alert('Please provide valid input');
        }
      }
    } catch (err) {
      console.log('errorOccured while applying job', err);
    }
  };

  // Form data change Handler
  const handleChange = (e) => {
    const updatedFormData = { ...formData, [currentState]: e.target.value };
    setFormData(updatedFormData);
  };

  // Form Data change handler for Non-Fsm Application forms
  const handleNonFsmChange = (e) => {
    const updatedFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(updatedFormData);
  };

  // Validation function to check form data
  const validate = async () => {
    const newErrors = {};
    if (!formData.Experience) newErrors.Experience = "Experience is required";
    if (!formData.ManagementExperience) newErrors.ManagementExperience = "Management Experience is required";
    if (!formData.Location) newErrors.Location = "Your current Location is required";
    if (!formData.Relocate) newErrors.Relocate = "Relocate info is required";
    await setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className='Application_Form_Container'>
      <h2>Applying for {job.JobTitle} at {job.CompanyName}</h2>
      {fsm && currentState ?
        <div>
          <label htmlFor={currentState} className='Application_Form_Container_Label'>{fsm.config.states[currentState].displayText}</label>
          <input
            id={currentState}
            className='Application_Form_Container_Input'
            type="text"
            value={formData[currentState] || ''}
            onChange={handleChange}
          />
          <div className='Application_Form_Container_Buttons' >
            {currentState !== fsm.config.initial &&
              <button className='Application_Form_Container_Button' onClick={handlePrev}>Prev</button>
            }
            {'NEXT' in fsm.config.states[currentState].on ?
              <button className='Application_Form_Container_Button' onClick={handleNext}>Next</button> :
              <button className='Application_Form_Container_Button Submit' onClick={() => handleSubmit(job._id)}>Submit</button>
            }
          </div>
        </div>
        :
        <form onSubmit={() => handleSubmit(job._id)}>
          <div className='Application_Form_Container'>
            <div className='Application_Form_Container_Div'>
              <label htmlFor='Experience' className='Application_Form_Container_Label'>How many years of experience do you have?</label>
              <input
                id="Experience"
                type="text"
                className='Application_Form_Container_Input'
                value={formData.Experience || ''}
                onChange={handleNonFsmChange}
              />
              {errors.Experience && <span className="error">{errors.Experience}</span>}
            </div>

            <div className='Application_Form_Container_Div'>
              <label htmlFor='ManagementExperience' className='Application_Form_Container_Label'>Do you have any experience in managing team ? </label>
              <input
                id="ManagementExperience"
                type="text"
                className='Application_Form_Container_Input'
                value={formData.ManagementExperience || ''}
                onChange={handleNonFsmChange}
              />
              {errors.ManagementExperience && <span className="error">{errors.ManagementExperience}</span>}
            </div>
            <div className='Application_Form_Container_Div'>
              <label htmlFor='Location' className='Application_Form_Container_Label'>Whats your current Location? </label>
              <input
                id="Location"
                type="text"
                className='Application_Form_Container_Input'
                value={formData.Location || ''}
                onChange={handleNonFsmChange}
              />
              {errors.Location && <span className="error">{errors.Location}</span>}
            </div>
            <div className='Application_Form_Container_Div'>
              <label htmlFor='Relocate' className='Application_Form_Container_Label'>Are you willing to relocate ? </label>
              <input
                id="Relocate"
                type="text"
                className='Application_Form_Container_Input'
                value={formData.Relocate || ''}
                onChange={handleNonFsmChange}
              />
              {errors.Relocate && <span className="error">{errors.Relocate}</span>}
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      }
    </div>
  );
};

export default ApplicationForm;
