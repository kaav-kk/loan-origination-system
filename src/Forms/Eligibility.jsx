import React, { useState } from "react";

const Eligibility = ({
  loanApplication,
  setLoanApplication,
  saveLoan,
  next,
  back
}) => {

  const [eligibility, setEligibility] = useState(
    loanApplication.eligibility || {
      income: "",
      cibilScore: "",
      employmentType: ""
    }
  );

  const [errors, setErrors] = useState({});

  const requiredFields = {
    income: "Annual Income",
    cibilScore: "CIBIL Score",
    employmentType: "Employment Type"
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setEligibility(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleNext = () => {

    const validateErrors = {};

    Object.entries(requiredFields).forEach(([field, label]) => {

      if (!eligibility[field]?.trim()) {

        validateErrors[field] = `${label} is required`;

      }

    });

    setErrors(validateErrors);

    if (Object.keys(validateErrors).length > 0) {

      return;

    }

    const updatedLoan = {

      ...loanApplication,

      eligibility: eligibility,

      step: 4,

      status: "In Progress"

    };

    setLoanApplication(updatedLoan);

    saveLoan(updatedLoan);

    next(4);

  };

  return (

    <>

      <h2>Eligibility</h2>

      <input
        type="number"
        placeholder="Annual Income"
        name="income"
        value={eligibility.income}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>
        {errors.income}
      </p>

      <input
        type="number"
        placeholder="CIBIL Score"
        name="cibilScore"
        value={eligibility.cibilScore}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>
        {errors.cibilScore}
      </p>

      <input
        type="text"
        placeholder="Employment Type"
        name="employmentType"
        value={eligibility.employmentType}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>
        {errors.employmentType}
      </p>

      <br />
      <br />

<div className="form-buttons">
  
<button onClick={() => back(2)}>
        Previous
      </button>

      <button onClick={handleNext}>
        Save & Next
      </button>

</div>

    </>

  );

};

export default Eligibility;