import React, { useState } from "react";
import PersonalInfo from "../forms/PersonalInfo";
import LoanDetails from "../forms/LoanDetails";
import Eligibility from "../forms/Eligibility";
import Disbursement from "../forms/Disbursement";
import "../CreateLoan.css";

const CreateLoan = () => {

  const loanType = localStorage.getItem("loanType");

  // Generate Loan Id
const generateLoanId = () => {

  const allLoans =
    JSON.parse(localStorage.getItem("loanApplication")) || [];

  if (allLoans.length === 0) {
    return "LOAN001";
  }

  const lastLoan = allLoans[allLoans.length - 1];

  const lastNumber = Number(
    lastLoan.loanId.replace("LOAN", "")
  );

  return "LOAN" + String(lastNumber + 1).padStart(3, "0");

};

  // Load selected loan or create new loan
  const [loanApplication, setLoanApplication] = useState(() => {

    const selectedLoan = JSON.parse(
      localStorage.getItem("selectedLoan")
    );

    if (selectedLoan) {
      return selectedLoan;
    }

    return {

      loanId: generateLoanId(),

      loanType: loanType,

      status: "In Progress",

      step: 1,

      personalInfo: {

        customerName: "",
        age: "",
        mobile: "",
        address: ""

      },

      loanDetails: {},

      eligibility: {},

      disbursement: {}

    };

  });

  // Current Screen
  const [step, setStep] = useState(loanApplication.step);

  // Save or Update Loan
  const saveLoan = (updatedLoan) => {

    let allLoans =
      JSON.parse(localStorage.getItem("loanApplication")) || [];

    const index = allLoans.findIndex(
      loan => loan.loanId === updatedLoan.loanId
    );

    if (index !== -1) {

      allLoans[index] = updatedLoan;

    }
    else {

      allLoans.push(updatedLoan);

    }

    localStorage.setItem(
      "loanApplication",
      JSON.stringify(allLoans)
    );

  };

  // Update Personal Info
  const updatePersonalInfo = (updatedPersonalInfo) => {

    setLoanApplication({

      ...loanApplication,

      personalInfo: updatedPersonalInfo

    });

  };

  return (

    <div className="create-loan-page">

      <h1>Create Loan - {loanApplication.loanType}</h1>

      <h3>{loanApplication.loanId}</h3>

      <div className="loan-container">

        {/* Left Side */}

        <div className="stepper">

          <div className={step >= 1 ? "active" : ""}>
            ✓ Personal Info
          </div>

          <div className={step >= 2 ? "active" : ""}>
            ✓ Loan Details
          </div>

          <div className={step >= 3 ? "active" : ""}>
            ✓ Eligibility
          </div>

          <div className={step >= 4 ? "active" : ""}>
            ✓ Disbursement
          </div>

        </div>

        {/* Right Side */}

        <div className="form-area">

          {step === 1 && (

            <PersonalInfo

              data={loanApplication.personalInfo}

              setData={updatePersonalInfo}

              loanApplication={loanApplication}

              setLoanApplication={setLoanApplication}

              saveLoan={saveLoan}

              next={setStep}

            />

          )}

          {step === 2 && (

            <LoanDetails

              loanApplication={loanApplication}

              setLoanApplication={setLoanApplication}

              saveLoan={saveLoan}

              next={setStep}

              back={setStep}

            />

          )}

          {step === 3 && (

            <Eligibility

              loanApplication={loanApplication}

              setLoanApplication={setLoanApplication}

              saveLoan={saveLoan}

              next={setStep}

              back={setStep}

            />

          )}

          {step === 4 && (

            <Disbursement

              loanApplication={loanApplication}

              setLoanApplication={setLoanApplication}

              saveLoan={saveLoan}

              back={setStep}

            />

          )}

        </div>

      </div>

    </div>

  );

};

export default CreateLoan;