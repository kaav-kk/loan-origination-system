import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Disbursement = ({
  loanApplication,
  setLoanApplication,
  saveLoan,
  back
}) => {

  const navigate = useNavigate();

  const [disbursement, setDisbursement] = useState(
    loanApplication.disbursement || {
      accountNumber: "",
      ifscCode: ""
    }
  );

  const [errors, setErrors] = useState({});

  const requiredFields = {
    accountNumber: "Account Number",
    ifscCode: "IFSC Code"
  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setDisbursement(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = () => {

    const validateErrors = {};

    Object.entries(requiredFields).forEach(([field, label]) => {

      if (!disbursement[field]?.trim()) {

        validateErrors[field] = `${label} is required`;

      }

    });

    setErrors(validateErrors);

    if (Object.keys(validateErrors).length > 0) {

      return;

    }

    const updatedLoan = {

      ...loanApplication,

      disbursement: disbursement,

      status: "Approval Pending",

      step: 4

    };

    setLoanApplication(updatedLoan);

    saveLoan(updatedLoan);

    localStorage.removeItem("selectedLoan");

    alert("Loan submitted successfully.");

    navigate("/Dashboard");

  };

  return (

    <>

      <h2>Disbursement</h2>

      <h3>Customer Details</h3>

      <p>
        <b>Customer Name :</b> {loanApplication.personalInfo.customerName}
      </p>

      <p>
        <b>Loan Type :</b> {loanApplication.loanType}
      </p>

      <p>
        <b>Loan Amount :</b> {loanApplication.loanDetails.loanAmount}
      </p>

      <p>
        <b>Loan ID :</b> {loanApplication.loanId}
      </p>

      <br />

      <input
        type="text"
        name="accountNumber"
        placeholder="Account Number"
        value={disbursement.accountNumber}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>
        {errors.accountNumber}
      </p>

      <input
        type="text"
        name="ifscCode"
        placeholder="IFSC Code"
        value={disbursement.ifscCode}
        onChange={handleChange}
      />

      <p style={{ color: "red" }}>
        {errors.ifscCode}
      </p>

      <br />
     
     <div className="form-buttons">
      <button onClick={() => back(3)}>
        Previous
      </button>

      <button onClick={handleSubmit}>
        Submit Loan
      </button>
     </div>
     

    </>

  );

};

export default Disbursement;