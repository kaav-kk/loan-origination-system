import React, { useState } from "react";

const LoanDetails = ({
  loanApplication,
  setLoanApplication,
  saveLoan,
  next,
  back
}) => {

  const [loanDetails, setLoanDetails] = useState(
    loanApplication.loanDetails || {
      loanAmount: "",
      tenure: "",
      purpose: ""
    }
  );

  const [errors, setErrors] = useState({});

  const requiredFields = {
    loanAmount: "Loan Amount",
    tenure: "Tenure"
  };

  // Update Loan Details
  const handleChange = (e) => {

    const { name, value } = e.target;

    const updatedLoanDetails = {

      ...loanDetails,

      [name]: value

    };

    setLoanDetails(updatedLoanDetails);

  };

  // Save Loan Details
  const handleNext = () => {

    const validateErrors = {};

    Object.entries(requiredFields).forEach(([field, label]) => {

      if (!loanDetails[field]?.trim()) {

        validateErrors[field] = `${label} is required`;

      }

    });

    setErrors(validateErrors);

    if (Object.keys(validateErrors).length > 0) {

      return;

    }

    const updatedLoan = {

      ...loanApplication,

      loanDetails: loanDetails,

      step: 3,

      status: "In Progress"

    };

    setLoanApplication(updatedLoan);

    saveLoan(updatedLoan);

    next(3);

  };

  return (

    <>

      <h2>Loan Details</h2>

      <input
        type="text"
        placeholder="Loan Amount"
        name="loanAmount"
        value={loanDetails.loanAmount}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>
        {errors.loanAmount}
      </p>

      <input
        type="text"
        placeholder="Tenure (Years)"
        name="tenure"
        value={loanDetails.tenure}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>
        {errors.tenure}
      </p>

      <input
        type="text"
        placeholder="Purpose"
        name="purpose"
        value={loanDetails.purpose}
        onChange={handleChange}
      />

      <br />
      <br />
      
      <div className="form-buttons">
            <button onClick={() => back(1)}>
        Previous
      </button>

      <button onClick={handleNext}>
        Save & Next
      </button>

      </div>


    </>

  );

};

export default LoanDetails;