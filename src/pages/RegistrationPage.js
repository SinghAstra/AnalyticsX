import React, { useEffect, useState } from "react";
import RegistrationStage1 from "../components/Auth/RegistrationStage1";
import RegistrationStage2 from "../components/Auth/RegistrationStage2";
import RegistrationStage3 from "../components/Auth/RegistrationStage3";
import "../styles/Registration.css";

const RegistrationPage = () => {
  const [currentStage, setCurrentStage] = useState(2);
  const [formData, setFormData] = useState({
    mobileOrEmail: "random@gmail.com",
    fullName: "Singh",
    username: "singh",
    password: "Abhay@codeman1",
  });

  const handleNext = () => {
    setCurrentStage(currentStage + 1);
  };

  const handleBack = () => {
    setCurrentStage(currentStage - 1);
  };

  useEffect(() => {
    document.title = "Sign Up · Social UI 2.0";
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
        <RegistrationStage2 onNext={handleNext} onBack={handleBack} />
      )}
      {currentStage === 3 && <RegistrationStage3 onBack={handleBack} />}
    </div>
  );
};

export default RegistrationPage;
