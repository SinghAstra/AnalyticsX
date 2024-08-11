import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Notification from "../Notification";

const RegistrationStage3 = ({
  formData,
  confirmationCode,
  setConfirmationCode,
  onNext,
  onBack,
}) => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
    setErrors({ ...errors, otp: "" });

    // Validate OTP length and content
    if (e.target.value.length === 6 && /^\d+$/.test(e.target.value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleFocus = (e) => {
    setErrors({ ...errors, otp: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the entered OTP matches the generated confirmation code
    // if the usr has entered correct confirmation code register the user
    if (otp === confirmationCode) {
      // Proceed to the next stage
      console.log("Register User formData : ", formData);
    } else {
      // Show an error if the OTP doesn't match
      setErrors({
        ...errors,
        otp: "Invalid confirmation code. Please try again.",
      });
      setIsValid(false);
    }
  };

  const sendConfirmationCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/send-confirmation-code",
        {
          email: formData.mobileOrEmail,
        }
      );
      setConfirmationCode(response.data.confirmationCode);
    } catch (error) {
      console.log("Error sending confirmation code:", error);
    }
  };

  const handleResendConfirmationCode = () => {
    sendConfirmationCode();
    setNotification("Confirmation code resent successfully.");

    // Reset OTP field and focus on it
    setOtp("");
    document.getElementById("otp").focus();

    // Hide notification after 2 seconds
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  useEffect(() => {
    sendConfirmationCode();
  }, [formData.mobileOrEmail]);

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {notification && <Notification message={notification} />}
      <img src="/mail.png" alt="mail" className="mail-icon" />
      <div className="title-container">
        <span className="title">Enter confirmation code</span>
        <span className="subtitle">
          Enter the confirmation code that we sent to {formData.mobileOrEmail}.
          <br />
          <Link onClick={handleResendConfirmationCode}>Resend Code</Link>
        </span>
      </div>
      <div className="input-container">
        <input
          className={`input-field ${errors.otp ? "error" : ""}`}
          id="otp"
          name="otp"
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="OTP"
          type="text"
          value={otp}
        />
        {errors.otp && <p className="error-message">{errors.otp}</p>}
      </div>
      <button
        type="submit"
        className={`block-level-button ${
          isValid ? "blue-button" : "disabled-blue-button"
        }`}
        disabled={!isValid}
      >
        Next
      </button>
      <button className="back-button" onClick={onBack}>
        <IoMdArrowRoundBack />
      </button>
    </form>
  );
};

export default RegistrationStage3;
