import React, { useEffect, useState } from 'react';
import { postJob } from '../services/JobsService';
import DetailedjobPostFSMConfig from '../fsm/DetailedjobPostFSMConfig';
import FSM from '../fsm/FSM';
import { useConfig } from '../contexts/ConfigContext';

/**
 * Form component for job posting.
 * @param {object} props - The props object.
 * @param {Function} props.onJobsUpdated - Function to call when jobs are updated.
 * @returns {JSX.Element} - JSX element representing the form component.
 */
const FormComponent = ({ onJobsUpdated }) => {
    const { JOB_POST_FSM_ENABLED } = useConfig();
    const [selectedOption, setSelectedOption] = useState(null);
    const [fsm, setFSM] = useState(null);
    const [errors, setErrors] = useState({});
    const [currentState, setCurrentState] = useState(DetailedjobPostFSMConfig.initial);
    const [formData, setFormData] = useState({});

    /**
     * Setting up FSM on initial rendering
     */
    useEffect(() => {
        if (JOB_POST_FSM_ENABLED) {
            let newFSM = new FSM(DetailedjobPostFSMConfig);
            setFSM(newFSM);
            setCurrentState(newFSM.config.initial);    
        }
    }, []);

    /**
     * Next button click event handler
     */
    const handleNext = () => {
        if (fsm.config.states[currentState].validate(formData[currentState] || '')) {
            const nextState = fsm.transition('NEXT');
            setCurrentState(nextState);
        } else {
            alert("Please provide valid input");
        }
    };

    /**
     * Prev button click event handler
     */
    const handlePrev = () => {
        const prevState = fsm.transition('PREV');
        setCurrentState(prevState);
    };

    /**
     * Job Post submission handler
     * @param {object} e - event object.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!JOB_POST_FSM_ENABLED) {
            if (validate()) {
                const data = await postJob(formData);
                onJobsUpdated();
            } else {
                console.log('Validation failed');
            }
        } else {
            try {
                console.log("Form Data:", formData);
                const data = await postJob(formData);
                onJobsUpdated();
            } catch (err) {
                console.log('error occured', err)
            }
        }
    };

    /**
     * Input field change handler
     * @param {object} e - event object.
     */
    const handleChange = (e) => {
        const updatedFormData = { ...formData, [currentState]: e.target.value };
        setFormData(updatedFormData);
    };

    /**
     * NonFsm Input field change handler
     * @param {object} e - event object.
     */
    const handleNonFsmChange = (e) => {
        const updatedFormData = { ...formData, [e.target.id]: e.target.value };
        setFormData(updatedFormData);
    };

    /**
     * Validates the form data.
     * @returns {boolean} - Indicates whether the form data is valid or not.
     */
    const validate = () => {
        const newErrors = {};
        if (!formData.CompanyName) newErrors.CompanyName = "Company Name is required";
        if (!formData.JobTitle) newErrors.JobTitle = "Job Title is required";
        if (!formData.ExperienceLevel) newErrors.ExperienceLevel = "Experience Level is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    return (
        <div className='PostJob_Container'>
            <h2>Post a Job</h2>

            {fsm && currentState ?
                <div>
                    <div>
                        <label htmlFor={currentState}  className='Post_Job_Container_Label'>{fsm.config.states[currentState].displayText}</label> </div>
                    <input id={currentState} className='Post_Job_Container_Input' type="text" value={formData[currentState] || ''} onChange={handleChange} />
                    {currentState !== fsm.config.initial &&
                        <button className='Post_Job_Container_Button' onClick={handlePrev}>Prev</button>
                    }
                    {'NEXT' in fsm.config.states[currentState].on ?
                        <button className='Post_Job_Container_Button' onClick={handleNext}>Next</button> :
                        <button className='Post_Job_Container_Button Submit' onClick={handleSubmit}>Submit</button>
                    }
                </div> :

                <form onSubmit={handleSubmit}>
                    <div className='Post_Job_Container'>
                        <div className='Post_Job_Container_Div'>
                            <label htmlFor="CompanyName" className='Post_Job_Container_Label'>Company Name</label>
                            <input
                                id="CompanyName"
                                type="text"
                                className='Post_Job_Container_Input'
                                value={formData.CompanyName || ''}
                                onChange={handleNonFsmChange}
                            />
                            {errors.CompanyName && <span className="error">{errors.CompanyName}</span>}
                        </div>
                        <div className='Post_Job_Container_Div'>
                            <label htmlFor="JobTitle" className='Post_Job_Container_Label'>Job Title</label>
                            <input
                                id="JobTitle"
                                type="text"
                                className='Post_Job_Container_Input'
                                value={formData.JobTitle || ''}
                                onChange={handleNonFsmChange}
                            />
                            {errors.JobTitle && <span className="error">{errors.JobTitle}</span>}
                        </div>
                        <div className='Post_Job_Container_Div'>
                            <label htmlFor="ExperienceLevel" className='Post_Job_Container_Label'>Experience Level</label>
                            <input
                                id="ExperienceLevel"
                                type="text"
                                className='Post_Job_Container_Input'
                                value={formData.ExperienceLevel || ''}
                                onChange={handleNonFsmChange}
                            />
                            {errors.ExperienceLevel && <span className="error">{errors.ExperienceLevel}</span>}
                        </div>
                        <div className='Post_Job_Container_Div'>
                            <label htmlFor="Salary" className='Post_Job_Container_Label'>Salary</label>
                            <input
                                id="Salary"
                                type="text"
                                className='Post_Job_Container_Input'
                                value={formData.Salary || ''}
                                onChange={handleNonFsmChange}
                            />
                            {errors.Salary && <span className="error">{errors.ExperienceLevel}</span>}
                        </div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            }
        </div>



    );
};

export default FormComponent;
