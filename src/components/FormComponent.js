import React, { useEffect, useState } from "react";
import { postJob } from "../services/JobsService";
import DetailedjobPostFSMConfig from "../fsm/DetailedjobPostFSMConfig";
import FSM from "../fsm/FSM";
import { useConfig } from "../contexts/ConfigContext";

/**
 * Form component for job posting.
 * @param {object} props - The props object.
 * @param {Function} props.onJobsUpdated - Function to call when jobs are updated.
 * @returns {JSX.Element} - JSX element representing the form component.
 */
const FormComponent = ({ onJobsUpdated }) => {
  const { JOB_POST_FSM_ENABLED } = useConfig();
  const [jobPostStatus, setJobPostStatus] = useState("");
  const [fsm, setFSM] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentState, setCurrentState] = useState(
    DetailedjobPostFSMConfig.initial
  );
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
  const handleNext = async () => {
    if (
      fsm.config.states[currentState].validate(formData[currentState] || "")
    ) {
      const nextState = fsm.transition("NEXT");
      setCurrentState(nextState);
    } else {
      await setErrors({ error: "Please provide valid input" });
    }
  };

  /**
   * Prev button click event handler
   */
  const handlePrev = () => {
    const prevState = fsm.transition("PREV");
    setCurrentState(prevState);
  };

  /**
   * Job Post submission handler
   * @param {object} e - event object.
   */
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let data;
      if (!JOB_POST_FSM_ENABLED) {
        if (validate()) {
          data = await postJob(formData);
          console.log("job posted", data);
          if (data?._id) {
            setJobPostStatus("success");
          }
        } else {
          return;
        }
      } else {
        console.log("Form Data:", formData);
        data = await postJob(formData);
        console.log("FSM job posted", data);
      }
      if (data?._id) {
        setJobPostStatus("success");
        onJobsUpdated();
      } else {
        setJobPostStatus("Error Occured");
      }
    } catch (err) {
      setJobPostStatus(err);
    }
  };

  /**
   * Input field change handler
   * @param {object} e - event object.
   */
  const handleChange = (e) => {
    setErrors({});
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
    console.log('formData',formData);
    const newErrors = {};
    if (!formData.CompanyName)
      newErrors.CompanyName = "Company Name is required";
    if (!formData.JobTitle) newErrors.JobTitle = "Job Title is required";
    if (!formData.ExperienceLevel)
      newErrors.ExperienceLevel = "Experience Level is required";
    if (!formData.Salary) newErrors.Salary = "Salary is required";
    if (!formData.JobLocation) newErrors.JobLocation = "Job Location is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="PostJob_Container">
      <h2>Post a Job</h2>
      {!jobPostStatus ? (
        fsm && currentState ? (
          <div>
            <div>
              <label
                htmlFor={currentState}
                className="Post_Job_Container_Label"
              >
                {fsm.config.states[currentState].displayText}
              </label>{" "}
            </div>
            <input
              id={currentState}
              className="Post_Job_Container_Input"
              type="text"
              value={formData[currentState] || ""}
              autoComplete="off"
              onChange={handleChange}
            />
            {errors?.error && <span className="error">{errors.error}</span>}
            {currentState !== fsm.config.initial && (
              <button
                className="Post_Job_Container_Button"
                onClick={handlePrev}
              >
                Prev
              </button>
            )}
            {"NEXT" in fsm.config.states[currentState].on ? (
              <button
                className="Post_Job_Container_Button"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button
                className="Post_Job_Container_Button Submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        ) : (
            <div className="Post_Job_Container">
              <div className="Post_Job_Container_Div">
                <label
                  htmlFor="CompanyName"
                  className="Post_Job_Container_Label"
                >
                  Company Name
                </label>
                <input
                  id="CompanyName"
                  type="text"
                  className="Post_Job_Container_Input"
                  autoComplete="off"
                  value={formData?.CompanyName || ""}
                  onChange={handleNonFsmChange}
                />
                {errors.CompanyName && (
                  <span className="error">{errors.CompanyName}</span>
                )}
              </div>
              <div className="Post_Job_Container_Div">
                <label htmlFor="JobTitle" className="Post_Job_Container_Label">
                  Job Title
                </label>
                <input
                  id="JobTitle"
                  type="text"
                  className="Post_Job_Container_Input"
                  value={formData.JobTitle || ""}
                  autoComplete="off"
                  onChange={handleNonFsmChange}
                />
                {errors.JobTitle && (
                  <span className="error">{errors.JobTitle}</span>
                )}
              </div>
              <div className="Post_Job_Container_Div">
                <label htmlFor="Salary" className="Post_Job_Container_Label">
                  Salary
                </label>
                <input
                  id="Salary"
                  type="text"
                  className="Post_Job_Container_Input"
                  value={formData.Salary || ""}
                  autoComplete="off"
                  onChange={handleNonFsmChange}
                />
                {errors.Salary && (
                  <span className="error">{errors.Salary}</span>
                )}
              </div>
              <div className="Post_Job_Container_Div">
                <label htmlFor="JobLocation" className="Post_Job_Container_Label">
                  Job Location
                </label>
                <input
                  id="JobLocation"
                  type="text"
                  className="Post_Job_Container_Input"
                  value={formData.JobLocation || ""}
                  autoComplete="off"
                  onChange={handleNonFsmChange}
                />
                {errors.Salary && (
                  <span className="error">{errors.JobLocation}</span>
                )}
              </div>
              <div className="Post_Job_Container_Div">
                <label
                  htmlFor="ExperienceLevel"
                  className="Post_Job_Container_Label"
                >
                  Experience Level
                </label>
                <div className="Post_Job_Container_Radio">
                  <label>
                    <input
                      id="ExperienceLevel"
                      name="ExperienceLevel"
                      type="radio"
                      value="Entry-Level"
                      checked={formData.ExperienceLevel === "Entry-Level"}
                      onChange={handleNonFsmChange}
                    />
                    Entry Level
                  </label>
                  <label>
                    <input
                      id="ExperienceLevel"
                      name="ExperienceLevel"
                      type="radio"
                      value="Experienced"
                      checked={formData.ExperienceLevel === "Experienced"}
                      onChange={handleNonFsmChange}
                    />
                    Experienced
                  </label>
                </div>
                {errors.ExperienceLevel && (
                  <span className="error">{errors.ExperienceLevel}</span>
                )}
              </div>

              <button type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
        )
      ) : jobPostStatus === "success" ? (
        <h3 className="Post_Job_Container_Status_Success">
          Job posted successfully
        </h3>
      ) : (
        <h3 className="Post_Job_Container_Status_Error">
          Sorry couldnt process this request. please try again later.{" "}
        </h3>
      )}
    </div>
  );
};

export default FormComponent;
