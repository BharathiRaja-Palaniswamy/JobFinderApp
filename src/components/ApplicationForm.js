import React, { useState, useEffect } from "react";
import EntryLevelJobAppFSMConfig from "../fsm/EntrylevelJobApplyFSMConfig";
import { applyJob } from "../services/JobsService";

import JobApplyFSMConfig from "../fsm/JobApplyFSMConfig";
import FSM from "../fsm/FSM";
import { useConfig } from "../contexts/ConfigContext";

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
  const {
    JOB_APPLICATION_FSM_ENABLED,
    TEMPERORY_USER_ID,
    ENTRY_LEVEL_JOBS_FSM_KEYWORDS,
  } = useConfig();

  // Component State variables
  const [fsm, setFSM] = useState(null);
  const [currentState, setCurrentState] = useState(null);
  const [jobApplyStatus, setJobApplyStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const jobExperienceLevel = job.ExperienceLevel;

  // Hook to set FSM path based on the selected Job's Experience level
  useEffect(() => {
    console.log("rerendering application form");
    let newFSM;
    if (JOB_APPLICATION_FSM_ENABLED) {
      if (
        ENTRY_LEVEL_JOBS_FSM_KEYWORDS.map((keyword) =>
          keyword.toLowerCase()
        ).includes(jobExperienceLevel.toLowerCase())
      ) {
        newFSM = new FSM(EntryLevelJobAppFSMConfig);
      } else {
        newFSM = new FSM(JobApplyFSMConfig);
      }
      setFSM(newFSM);
      setCurrentState(newFSM.config.initial);
    }
  }, [jobExperienceLevel]);

  // Next state Handler for FSM
  const handleNext = async (e) => {
    e.preventDefault();
    if (
      fsm.config.states[currentState].validate(formData[currentState] || "")
    ) {
      const nextState = fsm.transition("NEXT");
      setCurrentState(nextState);
    } else {
      await setErrors({ error: "Please provide valid input" });
    }
  };

  // Prev state Handler for FSM
  const handlePrev = (e) => {
    e.preventDefault();
    const prevState = fsm.transition("PREV");
    setCurrentState(prevState);
  };

  // Application form submit handler
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!JOB_APPLICATION_FSM_ENABLED) {
        if (await validate()) {
          formData.JobId = job?._id;
          formData.userId = TEMPERORY_USER_ID;
          const jobApplicationResponse = await applyJob(formData);
          if (jobApplicationResponse?._id) {
            setJobApplyStatus("success");
          } else {
            setJobApplyStatus("error");
          }
        }
      } else {
        if (
          fsm?.config?.states[currentState]?.validate(
            formData[currentState] || ""
          )
        ) {
          formData.JobId = job?._id;
          formData.userId = TEMPERORY_USER_ID;
          const jobApplicationResponse = await applyJob(formData);
          if (jobApplicationResponse?._id) {
            setJobApplyStatus("success");
          } else {
            setJobApplyStatus("error");
          }
        } else {
          await setErrors({ error: "Please provide valid input" });
        }
      }
      onApplicationSubmitted();
    } catch (err) {
      console.log("errorOccured while applying job", err);
      setJobApplyStatus("error");
    }
  };

  // Form data change Handler
  const handleChange = (e) => {
    setErrors({});
    const updatedFormData = { ...formData, [currentState]: e.target.value };
    setFormData(updatedFormData);
  };

  // Form Data change handler for No  n-Fsm Application forms
  const handleNonFsmChange = (e) => {
    const updatedFormData = { ...formData, [e.target.id]: e.target.value };
    setFormData(updatedFormData);
  };

  // Validation function to check form data
  const validate = async () => {
    const newErrors = {};
    if (!formData.Experience) newErrors.Experience = "Experience is required";
    if (!formData.ManagementExperience)
      newErrors.ManagementExperience = "Management Experience is required";
    if (!formData.Location)
      newErrors.Location = "Your current Location is required";
    if (!formData.Relocate) newErrors.Relocate = "Relocate info is required";
    await setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // const StandardForm = () => {
  //   return (

  //   );
  // }
  return (
    <div className="Application_Form_Container">
      <h2>
        Applying for {job.JobTitle} at {job.CompanyName}
      </h2>
      {!jobApplyStatus ? (
        fsm && currentState ? (
          // IF FSM enaled Render Questionaire from FSM Configuration
          <div>
            <label
              htmlFor={currentState}
              className="Application_Form_Container_Label"
            >
              {fsm.config.states[currentState].displayText}
            </label>
            <input
              id={currentState}
              className="Application_Form_Container_Input"
              type="text"
              autoComplete="off"
              value={formData[currentState] || ""}
              onChange={handleChange}
            />
            {errors?.error && <span className="error">{errors.error}</span>}

            <div className="Application_Form_Container_Buttons">
              {currentState !== fsm.config.initial && (
                <button
                  type="button"
                  className="Application_Form_Container_Button"
                  onClick={(e) => handlePrev(e)}
                >
                  Prev
                </button>
              )}
              {"NEXT" in fsm.config.states[currentState].on ? (
                <button
                  type="button"
                  className="Application_Form_Container_Button"
                  onClick={(e) => handleNext(e)}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="Application_Form_Container_Button Submit"
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="Application_Form_Container">
            <div className="Application_Form_Container_Div">
              <label
                htmlFor="Experience"
                className="Application_Form_Container_Label"
              >
                How many years of experience do you have?
              </label>
              <input
                id="Experience"
                key="Experience"
                type="text"
                className="Application_Form_Container_Input"
                value={formData?.Experience || ""}
                autoComplete="off"
                onChange={handleNonFsmChange}
              />
              {errors.Experience && (
                <span className="error">{errors.Experience}</span>
              )}
            </div>

            <div className="Application_Form_Container_Div">
              <label
                htmlFor="ManagementExperience"
                className="Application_Form_Container_Label"
              >
                Do you have any experience in managing team ?{" "}
              </label>
              <input
                id="ManagementExperience"
                type="text"
                className="Application_Form_Container_Input"
                value={formData?.ManagementExperience || ""}
                autoComplete="off"
                onChange={handleNonFsmChange}
              />
              {errors.ManagementExperience && (
                <span className="error">{errors.ManagementExperience}</span>
              )}
            </div>
            <div className="Application_Form_Container_Div">
              <label
                htmlFor="Location"
                className="Application_Form_Container_Label"
              >
                Whats your current Location?{" "}
              </label>
              <input
                id="Location"
                type="text"
                className="Application_Form_Container_Input"
                value={formData?.Location || ""}
                autoComplete="off"
                onChange={handleNonFsmChange}
              />
              {errors.Location && (
                <span className="error">{errors.Location}</span>
              )}
            </div>
            <div className="Application_Form_Container_Div">
              <label
                htmlFor="Relocate"
                className="Application_Form_Container_Label"
              >
                Are you willing to relocate ?{" "}
              </label>
              <input
                id="Relocate"
                type="text"
                className="Application_Form_Container_Input"
                value={formData?.Relocate || ""}
                autoComplete="off"
                onChange={handleNonFsmChange}
              />
              {errors.Relocate && (
                <span className="error">{errors.Relocate}</span>
              )}
            </div>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
          </div>
        )
      ) : jobApplyStatus === "success" ? (
        <h3 className="Application_Form_Container_Success">
          {" "}
          Congrats! You have applied successfully!
        </h3>
      ) : (
        <h3 className="Application_Form_Container_Error">
          Sorry! couldnt process this request. Please try again later.{" "}
        </h3>
      )}
    </div>
  );
};

export default ApplicationForm;
