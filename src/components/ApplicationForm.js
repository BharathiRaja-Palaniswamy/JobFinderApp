import React, { useState, useEffect } from 'react';
import { postJob } from '../services/JobsService';
import EntryLevelJobAppFSMConfig from '../fsm/EntrylevelJobApplyFSMConfig';
import JobApplyFSMConfig from '../fsm/JobApplyFSMConfig';
import FSM from '../fsm/FSM';
import { useConfig } from '../contexts/ConfigContext';


const ApplicationForm = ({ job, onApplicationSubmitted, closeModal }) => {

  const { JOB_APPLICATION_FSM_ENABLED, TEMPERORY_USER_ID } = useConfig();
  const [fsm, setFSM] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({});
  const jobExperienceLevel = job.ExperienceLevel;
  useEffect(() => {
    let newFSM;
    if (JOB_APPLICATION_FSM_ENABLED) {
      if (jobExperienceLevel === 'entrylevel') {
        newFSM = new FSM(EntryLevelJobAppFSMConfig);
      } else {
        newFSM = new FSM(JobApplyFSMConfig);
      }
      setFSM(newFSM);
      setCurrentState(newFSM.config.initial);
    }
  }, [jobExperienceLevel]);

  const handleNext = () => {
    if (fsm.config.states[currentState].validate(formData[currentState] || '')) {
      const nextState = fsm.transition('NEXT');
      setCurrentState(nextState);
    } else {
      alert('Please provide valid input');
    }
  };

  const handlePrev = () => {
    const prevState = fsm.transition('PREV');
    setCurrentState(prevState);
  };

  const handleSubmit = async (JobId) => {
    try {
    if (!JOB_APPLICATION_FSM_ENABLED) {
      if (await validate()) {
        formData.JobId = JobId;
        formData.userId = TEMPERORY_USER_ID;
        
        await onApplicationSubmitted(formData);
        console.log('Application Data:', formData);
      }
    } else {
      if (fsm.config.states[currentState].validate(formData[currentState] || '')) {
        formData.JobId = JobId;
        formData.userId = TEMPERORY_USER_ID;
        console.log('Application Data:', formData);
        await onApplicationSubmitted(formData);
      } else {
        alert('Please provide valid input');
      }
    } } catch (err) {
      console.log('errorOccured while applying job', err);
    }
  };

  const handleChange = (e) => {
    const updatedFormData = { ...formData, [currentState]: e.target.value };
    setFormData(updatedFormData);
  };
  const handleNonFsmChange = (e) => {
    const updatedFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(updatedFormData);
  };
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
          <label className='Application_Form_Container_Label'>{fsm.config.states[currentState].displayText}</label>
          <input
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
        <form onSubmit={()=>handleSubmit(job._id)}>
          <div className='Application_Form_Container'>
            <div className='Application_Form_Container_Div'>
              <label className='Application_Form_Container_Label'>How many years of experience do you have?</label>
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
              <label className='Application_Form_Container_Label'>Do you have any experience in managing team ? </label>
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
              <label className='Application_Form_Container_Label'>Whats your current Location? </label>
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
              <label className='Application_Form_Container_Label'>Are you willing to relocate ? </label>
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
