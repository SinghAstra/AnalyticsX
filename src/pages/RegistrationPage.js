import React, { useEffect, useState } from "react";
import RegistrationStage1 from "../components/Auth/RegistrationStage1";
import RegistrationStage2 from "../components/Auth/RegistrationStage2";
import RegistrationStage3 from "../components/Auth/RegistrationStage3";
import "../styles/Registration.css";

const RegistrationPage = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [formData, setFormData] = useState({
    mobileOrEmail: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleNext = () => {
    setCurrentStage(currentStage + 1);
  };

  const handleBack = () => {
    setCurrentStage(currentStage - 1);
  };

  useEffect(() => {
    document.title = "Sign Up • Social UI 2.0";
  }, []);

  return (
    <div className="form-container-wrapper">
      {currentStage === 1 && (
        <RegistrationStage1
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
        />
      )}
      {currentStage === 2 && (
        <RegistrationStage2
          onNext={handleNext}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
          setConfirmationCode={setConfirmationCode}
        />
      )}
      {currentStage === 3 && (
        <RegistrationStage3
          confirmationCode={confirmationCode}
          setConfirmationCode={setConfirmationCode}
          formData={formData}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default RegistrationPage;
